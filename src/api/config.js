import axios from 'axios'

export const baseUrl = 'http://124.70.71.78:3000'


const axiosInstance = axios.create({
  baseURL: baseUrl
})


axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网路错误")
  }
)


export {
  axiosInstance
}