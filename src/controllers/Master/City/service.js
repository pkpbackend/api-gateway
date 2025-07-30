import { mkApiMaster } from '../../../helpers/internalApi'
import FormData from 'form-data'
import fs from 'fs'
import ResponseError from '../../../modules/Error'

class CityService {
  static async findAll(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/city/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/city', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(`/city/${id}`)
    return response.data
  }

  static async create(body, batasWilayah, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiMasterWithAuth.post('/city', body)
    } catch (error) {
      response = error.response

      if (batasWilayah) fs.unlinkSync(batasWilayah.path)
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (response && response.data && batasWilayah) {
      const { id } = response.data
      const upload = batasWilayah.filename
      const geojsonSource = batasWilayah.path
      const newGeojson = fs.readFileSync(geojsonSource)

      const form = new FormData()
      form.append('batasWilayah', newGeojson, upload)

      fs.unlinkSync(geojsonSource)

      const resUpload = await apiMasterWithAuth.put(
        `/city/${id}/upload`,
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )

      return resUpload.data
    }

    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.delete(`/city/${id}`)
    return response.data
  }

  static async update(id, body, batasWilayah, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiMasterWithAuth.put(`/city/${id}`, body)
    } catch (error) {
      response = error.response

      if (batasWilayah) fs.unlinkSync(batasWilayah.path)
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (response && response.data && batasWilayah) {
      const { id } = response.data
      const upload = batasWilayah.filename
      const geojsonSource = batasWilayah.path
      const newGeojson = fs.readFileSync(geojsonSource)

      const form = new FormData()
      form.append('batasWilayah', newGeojson, upload)

      fs.unlinkSync(geojsonSource)

      const resUpload = await apiMasterWithAuth.put(
        `/city/${id}/upload`,
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )

      return resUpload.data
    }

    return response.data
  }
}

export default CityService
