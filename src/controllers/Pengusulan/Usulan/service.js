import fs from 'fs'
import FormData from 'form-data'
import { mkApiPengusulan } from '../../../helpers/internalApi'

class UsulanService {
  static async tahunUsulan(accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/usulan/tahun-usulan')
    return response.data
  }

  static async rekapDirektorat(
    tahunUsulan,
    wilayah,
    provinsiIds,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/per-direktorat',
      {
        params: {
          tahunUsulan,
          wilayah,
          provinsiIds,
        },
      }
    )
    return response.data
  }

  static async rekapProvinsi(
    tahunUsulan,
    direktoratId,
    wilayah,
    provinsiIds,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/per-provinsi',
      {
        params: {
          tahunUsulan,
          direktoratId,
          wilayah,
          provinsiIds,
        },
      }
    )
    return response.data
  }

  static async findVerminByUsulanId(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/usulan/${id}/vermin`)
    return response.data
  }

  static async findAllSasaranByUsulanId(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/usulan/${id}/sasaran`)
    return response.data
  }

  static async findAllDokumenByUsulanId(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/usulan/${id}/dokumen`)
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/usulan/${id}`)
    return response.data
  }

  static async findAll(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/usulan', {
      params,
    })
    return response.data
  }

  static async create(body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post('/usulan', body)
    return response.data
  }

  static async createRUK(body, dokumenSbu, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post('/usulan/ruk', body)

    if (response && response.data && dokumenSbu) {
      const { id } = response.data
      const dokumenSbuName = dokumenSbu.filename
      const dokumenSbuSource = `${dokumenSbu.destination}${dokumenSbuName}`
      const newDokumenSbu = fs.readFileSync(dokumenSbuSource)

      const form = new FormData()
      form.append('dokumenSbu', newDokumenSbu, dokumenSbuName)

      fs.unlinkSync(dokumenSbuSource)

      const resUpload = await apiPengusulanWithAuth.put(
        `/usulan/${id}/dokumen-sbu`,
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

  static async createComment(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post(
      `/usulan/${id}/comment`,
      body
    )
    return response.data
  }

  static async lampiranPrioritas(
    usulanId,
    file,
    jenisPrioritas,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    if (file) {
      const fileName = file.filename
      const fileSource = `${file.destination}${fileName}`
      const newfile = fs.readFileSync(fileSource)

      const form = new FormData()
      form.append('file', newfile, fileName)
      form.append('jenisPrioritas', jenisPrioritas)

      fs.unlinkSync(fileSource)

      const resUpload = await apiPengusulanWithAuth.put(
        `/usulan/lampiran-prioritas/${usulanId}`,
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

    return false
  }

  static async getLampiranPrioritas(
    usulanId,
    jenisPrioritas,
    accessTokenInternal
  ) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      `/usulan/lampiran-prioritas/${usulanId}/${jenisPrioritas}`
    )
    return response.data
  }

  static async updateDokumenSBU(id, dokumenSbu, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    const form = new FormData()

    if (dokumenSbu) {
      const dokumenSbuName = dokumenSbu.filename
      const dokumenSbuSource = `${dokumenSbu.destination}${dokumenSbuName}`
      const newDokumenSbu = fs.readFileSync(dokumenSbuSource)

      form.append('dokumenSbu', newDokumenSbu, dokumenSbuName)

      fs.unlinkSync(dokumenSbuSource)
    }

    const response = await apiPengusulanWithAuth.put(
      `/usulan/${id}/dokumen-sbu`,
      form,
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      }
    )

    return response.data
  }

  static async updateVerlok(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(
      `/usulan/${id}/verlok`,
      body
    )
    return response.data
  }

  static async update(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(`/usulan/${id}`, body)
    return response.data
  }

  static async updateRUK(id, body, dokumenSbu, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(`/usulan/${id}`, body)

    if (response && response.data && dokumenSbu) {
      const { id } = response.data
      const dokumenSbuName = dokumenSbu.filename
      const dokumenSbuSource = `${dokumenSbu.destination}${dokumenSbuName}`
      const newDokumenSbu = fs.readFileSync(dokumenSbuSource)

      const form = new FormData()
      form.append('dokumenSbu', newDokumenSbu, dokumenSbuName)

      fs.unlinkSync(dokumenSbuSource)

      const resUpload = await apiPengusulanWithAuth.put(
        `/usulan/${id}/dokumen-sbu`,
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

  static async deleteById(id, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.delete(`/usulan/${id}`)
    return response.data
  }

  static async updateStatusTerkirim(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post(
      `/usulan/${id}/statusterkirim`,
      body
    )
    return response.data
  }

  static async exportExcel(params, accessTokenInternal, res) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/usulan/export/excel', {
      params,
    })
    return response.data
  }

  static async matrixProvinsi(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/provinsi',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixRuk(UsulanId, params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      `/usulan/rekapitulasi/matrix-ruk/${UsulanId}`,
      {
        params,
      }
    )
    return response.data
  }

  static async matrixExportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixProvinsiExportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/provinsi/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixProvinsiExportPdf(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/provinsi/export/pdf',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixKabupaten(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/kabupaten',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixKabupatenExportExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/kabupaten/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async matrixKabupatenExportPdf(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/usulan/rekapitulasi/matrix/kabupaten/export/pdf',
      {
        params,
      }
    )
    return response.data
  }
}

export default UsulanService
