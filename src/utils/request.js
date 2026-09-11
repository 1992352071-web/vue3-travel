import axios from 'axios'

const request = axios.create({
  baseURL: 'http://159.75.169.224:1236',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)
// ai流式接口处理
export async function fetchStream(url, data, onChunk, onComplete, onError) {
  const controller = new AbortController()
  // 用标志位防止重复触发 onComplete / onError
  let finished = false
  const finishComplete = () => { if (!finished) { finished = true; onComplete() } }
  const finishError = (msg) => { if (!finished) { finished = true; onError(msg) } }

  try {
    const response = await fetch(`http://159.75.169.224:1236/api/travel/${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break // 流结束，交给 finally 走完成回调

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n').filter(line => line.trim())

      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const jsonStr = line.substring(5).trim()
        if (!jsonStr) continue

        try {
          const jsonData = JSON.parse(jsonStr)

          if (jsonData.type === 'chunk') {
            onChunk(jsonData.content)
          }
          else if (jsonData.done === 'true') {
            finishComplete()
          }
          else if (jsonData.error === 'true') {
            finishError(jsonData.content || 'AI 返回错误')
          }
        } catch (error) {
          console.error('解析 JSON 失败:', error)
        }

        if (finished) break
      }
      if (finished) break
    }
  } catch (error) {
    // fetch 本身异常（网络错误、被 abort 等）
    if (error.name !== 'AbortError') {
      finishError(error.message || '网络请求失败')
    }
  } finally {
    // 兜底：只要还没走 onError/onComplete，这里一定触发完成
    finishComplete()
    controller.abort()
  }
}
export default request
