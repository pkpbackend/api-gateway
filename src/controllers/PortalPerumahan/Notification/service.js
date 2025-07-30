import { mkApiPortalPerumahan } from '../../../helpers/internalApi'

class NotificationService {
  static async getByUser(req, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    const { page, pageSize, filtered, sorted } = req.query

    const response = await apiPortalPerumahanWithAuth.get('/notification', {
      params: {
        page,
        pageSize,
        filtered,
        sorted,
      },
    })
    return response.data
  }

  static async getDetail(req, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    const { id } = req.params
    const response = await apiPortalPerumahanWithAuth.get(`/notification/${id}`)
    return response.data
  }

  static async readAll(accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)

    const response = await apiPortalPerumahanWithAuth.get(
      '/notification/read/all'
    )
    return response.data
  }
}

export default NotificationService
