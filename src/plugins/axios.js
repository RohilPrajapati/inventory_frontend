import { getAuthHeader, logout } from '../helpers'
import { API_HOST } from '../configs'
import axios from 'axios'
// import Auth from '../services/Auth'

const httpClient = axios.create({
  baseURL: API_HOST,
  headers: {
    common: getAuthHeader()
  }
})
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      logout()
      // if (Auth.postrefreshToken()) {
      //   // window.location.reload();
      //   return
      // } else {
      //   logout()
      // }
    }
    return Promise.reject(error)
  }
)

export function createClient () {
  const httpClient1 = axios.create({
    baseURL: API_HOST,
    headers: {
      common: getAuthHeader()
    }
  })
  httpClient1.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response
    },
    function (error) {
      if (error.response.status === 401) {
        logout()
        // window.location.reload()
      }
      return Promise.reject(error)
    }
  )
  return httpClient1
}

export default httpClient
