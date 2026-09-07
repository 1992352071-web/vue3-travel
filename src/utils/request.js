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
// 流式接口处理
export async function fetchStream(url, data, onChunk, onComplete, onError) {
  //终止请求控制器
  // 备用接口
  // http://159.75.169.224:1236/api/travel/${url}
  const controller = new AbortController()
  const response = await fetch(`http://159.75.169.224:1236/api/travel/${url}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
      signal: controller.signal,
    }
  )
  //创建响应体的可读流读取器
  const reader = response.body.getReader()
  //将二进制数据解码为字符串
  const decoder = new TextDecoder()

  let result = ''

  while (true) {
    const { done, value } = await reader.read()
    //读取完毕标识符
    if (done) {
      break
    }
    const chunk = decoder.decode(value, { stream: true })
    console.log(chunk)

    const lines = chunk.split('\n').filter(line => line.trim())
    for (const line of lines) {
      if (line.startsWith('data:')) {
        const jsonStr = Line.substring(5)
        try {
          if (jsonStr) {
            const jsonData = JSON.parse(jsonStr)

            if (jsonData.type === 'chunk') {
              //分片数据
              onChunk(jsonData.content)
            }
            else if (jsonData.done === 'true') {
              //完成数据
              onComplete()
            }
            else if (jsonData.error === 'true') {
              //错误数据
              onError(jsonData.content)
            }
          }
        } catch (error) {
          console.error('解析JSON失败:', error)
        }

      }
    }
  }
  return controller.abort()
}
export default request
