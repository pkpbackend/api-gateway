import { mkApiMaster } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'
import ResponseError from '../../../modules/Error'

class ProvinsiService {
  static async findAll(params, accessTokenInternal) {
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiProvinsiWithAuth.get('/provinsi/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiProvinsiWithAuth.get('/provinsi', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiProvinsiWithAuth.get(`/provinsi/${id}`)
    return response.data
  }

  static async create(body, batasWilayah, accessTokenInternal) {
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiProvinsiWithAuth.post('/provinsi', body)
    } catch (error) {
      response = error.response

      if (batasWilayah) fs.unlinkSync(batasWilayah.path)
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (response && response.data && batasWilayah) {
      const { id } = response.data
      const batasWilayahName = batasWilayah.filename
      const batasWilayahSource = batasWilayah.path
      const newbatasWilayah = fs.readFileSync(batasWilayahSource)

      const form = new FormData()
      form.append('batasWilayah', newbatasWilayah, batasWilayahName)

      fs.unlinkSync(batasWilayahSource)

      const resUpload = await apiProvinsiWithAuth.put(
        `/provinsi/${id}/batas-wilayah-provinsi`,
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
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)

    let response

    try {
      response = await apiProvinsiWithAuth.put(`/provinsi/${id}`, body)
    } catch (error) {
      response = error.response

      if (batasWilayah) fs.unlinkSync(batasWilayah.path)
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (response && response.data && batasWilayah) {
      const { id } = response.data
      const batasWilayahName = batasWilayah.filename
      const batasWilayahSource = batasWilayah.path
      const newbatasWilayah = fs.readFileSync(batasWilayahSource)

      const form = new FormData()
      form.append('batasWilayah', newbatasWilayah, batasWilayahName)

      fs.unlinkSync(batasWilayahSource)

      const resUpload = await apiProvinsiWithAuth.put(
        `/provinsi/${id}/batas-wilayah-provinsi`,
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
    const apiProvinsiWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiProvinsiWithAuth.delete(`/provinsi/${id}`)
    return response.data
  }
}

export default ProvinsiService
