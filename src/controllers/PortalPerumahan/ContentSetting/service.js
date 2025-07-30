import { mkApiPortalPerumahan } from '../../../helpers/internalApi'
import fs from 'fs'
import FormData from 'form-data'

const apiPortalPerumahan = mkApiPortalPerumahan()

class ContentSettingService {
  static async findAll(req) {
    // ambil semua request query
    const { page, pageSize, filtered, sorted } = req.query

    const response = await apiPortalPerumahan.get('/contentsetting', {
      params: {
        page,
        pageSize,
        filtered,
        sorted,
      },
    })
    return response.data
  }

  static async findOne(req) {
    const { id } = req.params
    const response = await apiPortalPerumahan.get(`/contentsetting/${id}`)
    return response.data
  }

  static async create(accessTokenInternal, body) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.post(
      '/contentsetting',
      body
    )
    return response.data
  }

  static async update(accessTokenInternal, body, id) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.put(
      `/contentsetting/${id}`,
      body
    )
    return response.data
  }

  static async delete(accessTokenInternal, id) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.delete(
      `/contentsetting/${id}`
    )
    return response.data
  }

  static async uploadDoc(doc, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    const fileName = doc.filename
    const fileSource = `${doc.destination}${fileName}`
    const newFile = fs.readFileSync(fileSource)

    const form = new FormData()

    form.append('document', newFile, fileName)
    fs.unlinkSync(fileSource)

    const response = await apiPortalPerumahanWithAuth.post(
      '/contentsetting/upload',
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
}

export default ContentSettingService
