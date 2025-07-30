import axios from 'axios'
import {
  API_SIBARU,
  API_SSO,
  API_PORTAL_PERUMAHAN,
  API_PENGUSULAN,
  API_ASPIRASI,
  API_MASTER,
} from '../config/env'

function mkInternalApi(baseURL, accessToken) {
  const internalApi = axios.create({
    baseURL,
  })

  internalApi.interceptors.request.use(
    function (config) {
      // Do something before request is sent

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
      }

      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  internalApi.interceptors.response.use(
    function (response) {
      // Do something with response data
      // response.data = (response.data).data
      return response
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error)
    }
  )

  return internalApi
}

export const mkApiSSO = (accessToken) =>
  mkInternalApi(`${API_SSO}/v3`, accessToken)
export const mkApiMaster = (accessToken) =>
  mkInternalApi(`${API_MASTER}/v3`, accessToken)
export const mkApiPortalPerumahan = (accessToken) =>
  mkInternalApi(`${API_PORTAL_PERUMAHAN}/v3`, accessToken)
export const mkApiPengusulan = (accessToken) =>
  mkInternalApi(`${API_PENGUSULAN}/v3`, accessToken)
export const mkApiAspirasi = (accessToken) =>
  mkInternalApi(`${API_ASPIRASI}/v3`, accessToken)
export const mkExApiSSO = () => mkInternalApi(`${API_SSO}/exapi`)
export const mkExApiPengusulan = (accessToken) =>
  mkInternalApi(`${API_PENGUSULAN}/exapi`, accessToken)
export const mkExApiMaster = () => mkInternalApi(`${API_MASTER}/exapi`)
