import { mkApiPortalPerumahan } from "../../../helpers/internalApi"

const apiPortalPerumahan  = mkApiPortalPerumahan()

class BannerService {

  static async findAll() {
    const response = await apiPortalPerumahan.get('/banner')
    return response.data
  }

  static async findAllPublished(accessTokenInternal) {
    const apiPortalPerumahanWithAuth  = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/banner/published')
    return response.data
  }

}

export default BannerService
