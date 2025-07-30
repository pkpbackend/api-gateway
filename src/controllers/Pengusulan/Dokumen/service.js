import fs from 'fs'
import FormData from 'form-data'
import { mkApiPengusulan } from '../../../helpers/internalApi'

class DokumenService {
  static async findAll(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/dokumen', {
      params,
    })
    return response.data
  }

  static async create(
    { model, ModelId, UsulanId, MasterDokumenId, keterangan, lengkap, status },
    file,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

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

      response = await apiPengusulanWithAuth.post('/dokumen', form, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      })
    } else {
      response = await apiPengusulanWithAuth.post('/dokumen', {
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

  static async update(
    id,
    { model, ModelId, UsulanId, MasterDokumenId, keterangan, lengkap, status },
    file,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

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

      response = await apiPengusulanWithAuth.put(`/dokumen/${id}`, form, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      })
    } else {
      response = await apiPengusulanWithAuth.put(`/dokumen/${id}`, {
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
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.delete(`/dokumen/${id}`)
    return response.data
  }

  static async findAllSerahTerima(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/dokumen/serahterima', {
      params,
    })
    return response.data
  }

  static async createSerahTerima(
    { SerahTerimaId, MasterDokumenId, keterangan, status, type, activity },
    file,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    let response

    if (file) {
      const fileName = file.filename
      const fileSource = `${file.destination}${fileName}`
      const newFile = fs.readFileSync(fileSource)

      const form = new FormData()

      form.append('SerahTerimaId', SerahTerimaId)
      form.append('MasterDokumenId', MasterDokumenId)
      form.append('keterangan', keterangan ? keterangan : '')
      form.append('status', status ? status : '')
      form.append('type', type ? type : '')
      form.append('activity', activity ? activity : '')

      form.append('file', newFile, fileName)
      fs.unlinkSync(fileSource)

      response = await apiPengusulanWithAuth.post(
        '/dokumen/serahterima',
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    } else {
      response = await apiPengusulanWithAuth.post('/dokumen/serahterima', {
        SerahTerimaId,
        MasterDokumenId,
        keterangan,
        status,
        type,
        activity,
      })
    }

    return response.data
  }

  static async updateSerahTerima(
    id,
    { SerahTerimaId, MasterDokumenId, keterangan, lengkap, activity },
    file,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    let response

    if (file) {
      const fileName = file.filename
      const fileSource = `${file.destination}${fileName}`
      const newFile = fs.readFileSync(fileSource)

      const form = new FormData()

      form.append('SerahTerimaId', SerahTerimaId)
      form.append('MasterDokumenId', MasterDokumenId)
      form.append('keterangan', keterangan ? keterangan : '')
      form.append('lengkap', lengkap ? lengkap : '')
      form.append('activity', activity ? activity : '')

      form.append('file', newFile, fileName)
      fs.unlinkSync(fileSource)

      response = await apiPengusulanWithAuth.put(
        `/dokumen/serahterima/${id}`,
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    } else {
      response = await apiPengusulanWithAuth.put(`/dokumen/serahterima/${id}`, {
        SerahTerimaId,
        MasterDokumenId,
        keterangan,
        lengkap,
        activity,
      })
    }

    return response.data
  }

  static async getS3urlSerahTerimaZip(ModelId, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      `/dokumen/serahterima/${ModelId}/s3url`
    )
    return response.data
  }

  static async downloadSerahTerimaZip(id, accessTokenInternal, res) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    const fileName = `serahterima-${id}-${new Date().getTime()}.zip`
    const writer = fs.createWriteStream(fileName)

    try {
      const response = await apiPengusulanWithAuth.get(
        `/dokumen/serahterima/${id}/download`,
        {
          responseType: 'stream',
        }
      )

      response.data.pipe(writer)

      writer.on('finish', () => {
        return res.download(fileName, (err) => {
          if (err) {
            console.error(err)
            return res.status(500).json({ message: 'Gagal mengunduh dokumen' })
          }

          fs.unlink(fileName, (err) => {
            if (err) {
              console.error(err)
            }
          })
        })
      })
    } catch (error) {
      console.error(error)
      fs.unlink(fileName, (err) => {
        if (err) {
          console.error(err)
        }
      })
      if (error.response.status == 400) {
        return res.status(404).json({ message: 'Dokumen tidak ditemukan' })
      }
      return res.status(500).json({ message: 'Gagal mengunduh dokumen' })
    }
  }

  static async validateSerahTerima(body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post(
      '/dokumen/serahterima/validation',
      body
    )
    return response.data
  }
}

export default DokumenService
