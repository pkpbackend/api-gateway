import { mkApiMaster } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'
import ResponseError from '../../../modules/Error'

class DesaService {
  static async findAll(params, accessTokenInternal) {
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiDesaWithAuth.get('/desa/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiDesaWithAuth.get('/desa', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiDesaWithAuth.get(`/desa/${id}`)
    return response.data
  }

  static async create(body, batasWilayah, accessTokenInternal) {
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiDesaWithAuth.post('/desa', body)
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

      const resUpload = await apiDesaWithAuth.put(
        `/desa/${id}/batas-wilayah-desa`,
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

  static async update(id, body, batasWilayah, accessTokenInternal) {
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiDesaWithAuth.put(`/desa/${id}`, body)
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

      const resUpload = await apiDesaWithAuth.put(
        `/desa/${id}/batas-wilayah-desa`,
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
    const apiDesaWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiDesaWithAuth.delete(`/desa/${id}`)
    return response.data
  }
}

export default DesaService
