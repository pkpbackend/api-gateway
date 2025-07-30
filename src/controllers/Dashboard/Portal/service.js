import { mkApiPortalPerumahan } from '../../../helpers/internalApi'

class DashboardPortalService {

  static async findFlppSummary(params, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/dashboard/flpp/summary', {
      params,
    })
    return response.data
  }

  static async findBacklogSummary(params, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/dashboard/flpp/summary', {
      params,
    })
    return response.data
  }

}

export default DashboardPortalService
