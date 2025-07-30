import { mkApiPortalPerumahan } from '../../../helpers/internalApi'

class FaqService {
  static async findAll(req) {
    // ambil semua request query
    const { page, pageSize, filtered, sorted } = req.query
    const apiPortalPerumahan = mkApiPortalPerumahan()
    const response = await apiPortalPerumahan.get('/faq', {
      params: {
        page,
        pageSize,
        filtered,
        sorted,
      },
    })
    return response.data
  }

  static async findOne(id, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get(`/faq/${id}`)
    return response.data
  }

  static async create(accessTokenInternal, body) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.post('/faq', body)
    return response.data
  }

  static async update(accessTokenInternal, body, id) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.put(`/faq/${id}`, body)
    return response.data
  }

  static async delete(accessTokenInternal, id) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.delete(`/faq/${id}`)
    return response.data
  }
}

export default FaqService
