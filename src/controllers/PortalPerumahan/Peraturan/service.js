import fs from 'fs'
import FormData from 'form-data'
import { mkApiPortalPerumahan } from '../../../helpers/internalApi'
import ResponseError from '../../../modules/Error'

class PeraturanService {
  static async findAll(params, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalWithAuth.get('/peraturan/all', {
      params,
    })
    return response.data
  }

  static async findAllPaginate(params, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalWithAuth.get('/peraturan', {
      params,
    })
    return response.data
  }

  static async findById(id, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalWithAuth.get(`/peraturan/${id}`)
    return response.data
  }

  static async create(body, attachments, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    let response

    try {
      response = await apiPortalWithAuth.post('/peraturan', body)
    } catch (error) {
      response = error.response
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (
      response &&
      response.data &&
      Array.isArray(attachments) &&
      attachments.length > 0
    ) {
      const { id } = response.data

      const form = new FormData()

      for (const attachment of attachments) {
        const attachmentName = attachment.filename
        const attachmentSource = attachment.path
        const newAttachment = fs.readFileSync(attachmentSource)

        form.append('attachments[]', newAttachment, attachmentName)
        fs.unlinkSync(attachmentSource)
      }

      await apiPortalWithAuth.put(`/peraturan/${id}/attachments`, form, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      })
    }

    return response.data
  }

  static async update(id, body, attachments, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    let response

    try {
      response = await apiPortalWithAuth.put(`/peraturan/${id}`, body)
    } catch (error) {
      response = error.response
      throw new ResponseError.BadRequest(response?.data?.message)
    }

    if (
      response &&
      response.data &&
      Array.isArray(attachments) &&
      attachments.length > 0
    ) {
      const { id } = response.data

      const form = new FormData()

      for (const attachment of attachments) {
        const attachmentName = attachment.filename
        const attachmentSource = attachment.path
        const newAttachment = fs.readFileSync(attachmentSource)

        form.append('attachments[]', newAttachment, attachmentName)
        fs.unlinkSync(attachmentSource)
      }

      await apiPortalWithAuth.put(`/peraturan/${id}/attachments`, form, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          ...form.getHeaders(),
        },
      })
    }

    return response.data
  }

  static async deleteById(id, accessTokenInternal) {
    const apiPortalWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalWithAuth.delete(`/peraturan/${id}`)
    return response.data
  }
}

export default PeraturanService
