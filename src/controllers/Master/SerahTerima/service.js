import { mkApiMaster } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'
import { Blob } from 'buffer'

class SerahTerimaService {

  static async importSpreadsheetFile(spreadsheetFile, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    const filename = spreadsheetFile.filename
    const spreadsheetFileSource = spreadsheetFile.path
    const newSpreadsheetFile = fs.readFileSync(spreadsheetFileSource)

    const form = new FormData()
    form.append('spreadsheetFile', newSpreadsheetFile, filename)

    fs.unlinkSync(spreadsheetFileSource)

    const response = await apiMasterWithAuth.post(
      '/serahterima/import',
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

  static async createRusus(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post('/serahterima/rusus', body)
    return response.data
  }

  static async updateRusus(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.put(
      `/serahterima/rusus/${id}`,
      body
    )
    return response.data
  }

  static async createComment(id, body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post(
      `/serahterima/${id}/comment`,
      body
    )
    return response.data
  }

  static async downloadSerahTerimaPdf(id, accessTokenInternal, res) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)

    const fileName = `serahterima-${id}-${new Date().getTime()}.pdf`
    const writer = fs.createWriteStream(fileName)

    try {
      const response = await apiMasterWithAuth.get(
        `/serahterima/${id}/download-pdf`,
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

  static async getSerahTerimaDashboard(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/serahterima/dashboard', {
      params,
    })
    return response.data
  }

  static async getSerahTerimaListDashboard(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/serahterima/dashboard/list',
      {
        params,
      }
    )
    return response.data
  }

  static async getDashboardMap(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/serahterima/dashboard/map', {
      params,
    })
    return response.data
  }

  static async exportExcel(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/serahterima/export/excel', {
      params,
    })
    return response.data
  }

  static async sendNotification(body, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.post(
      '/serahterima/notification',
      body
    )
    return response.data
  }
}

export default SerahTerimaService
