import request from '../utils/request'

export function getTravelRecommendation(data) {
  return request({
    url: '/api/travel/recommend',
    method: 'post',
    data,
  })
}
