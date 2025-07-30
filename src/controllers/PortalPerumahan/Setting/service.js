import { mkApiPortalPerumahan } from '../../../helpers/internalApi'

const apiPortalPerumahan = mkApiPortalPerumahan()

class SurveyService {

  static async findAllSettingGroups(accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/setting/group')
    return response.data
  }

  static async findSettingByKey(key) {
    const response = await apiPortalPerumahan.get(`/setting/${key}`)
    return response.data
  }

  static async updateSettingByKey(key, value, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.put(
      `/setting/${key}`,
      { value }
    )
    return response.data
  }

}

export default SurveyService
