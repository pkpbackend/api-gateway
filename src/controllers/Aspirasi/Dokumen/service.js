import fs from 'fs'
import FormData from 'form-data'
import { mkApiAspirasi } from '../../../helpers/internalApi'

class DokumenService {

  static async findAll(params, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get('/dokumen', {
      params,
    })
    return response.data
  }

  static async create({
    model,
    ModelId,
    UsulanId,
    MasterDokumenId,
    keterangan,
    lengkap,
    status,
  }, file, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)

    let response

    if (file) {
      const fileName = file.filename
      const fileSource = `${file.destination}${fileName}`
      const newFile = fs.readFileSync(fileSource)

      const form = new FormData()

      form.append('model', model ? model : '')
      form.append('ModelId', ModelId ? ModelId : '')
      form.append('UsulanId', UsulanId)
      form.append('MasterDokumenId', MasterDokumenId)
      form.append('keterangan', keterangan ? keterangan : '')
      form.append('lengkap', lengkap ? lengkap : '')
      form.append('status', status ? status : '')

      form.append('file', newFile, fileName)
      fs.unlinkSync(fileSource)

      response = await apiAspirasiWithAuth.post(
        '/dokumen',
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    }
    else {
      response = await apiAspirasiWithAuth.post('/dokumen', {
        model,
        ModelId,
        UsulanId,
        MasterDokumenId,
        keterangan,
        lengkap,
        status,
      })
    }

    return response.data
  }

  static async update(id, {
    model,
    ModelId,
    UsulanId,
    MasterDokumenId,
    keterangan,
    lengkap,
    status,
  }, file, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)

    let response

    if (file) {
      const fileName = file.filename
      const fileSource = `${file.destination}${fileName}`
      const newFile = fs.readFileSync(fileSource)

      const form = new FormData()

      form.append('model', model ? model : '')
      form.append('ModelId', ModelId ? ModelId : '')
      form.append('UsulanId', UsulanId)
      form.append('MasterDokumenId', MasterDokumenId)
      form.append('keterangan', keterangan ? keterangan : '')
      form.append('lengkap', lengkap ? lengkap : '')
      form.append('status', status ? status : '')

      form.append('file', newFile, fileName)
      fs.unlinkSync(fileSource)

      response = await apiAspirasiWithAuth.put(
        `/dokumen/${id}`,
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    }
    else {
      response = await apiAspirasiWithAuth.put(`/dokumen/${id}`, {
        model,
        ModelId,
        UsulanId,
        MasterDokumenId,
        keterangan,
        lengkap,
        status,
      })
    }

    return response.data
  }

  static async delete(id, accessTokenInternal) {
    const apiAspirasiWithAuth = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.delete(`/dokumen/${id}`)
    return response.data
  }

}

export default DokumenService
