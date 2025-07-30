import { mkApiPortalPerumahan } from '../../../helpers/internalApi'

const apiPortalPerumahan = mkApiPortalPerumahan()

class SurveyService {

  static async findSummary(accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/survey/summary')
    return response.data
  }

  static async findPaginateResponden(params, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get('/survey/responden', {
      params,
    })
    return response.data
  }

  static async findRespondenById(id, accessTokenInternal) {
    const apiPortalPerumahanWithAuth = mkApiPortalPerumahan(accessTokenInternal)
    const response = await apiPortalPerumahanWithAuth.get(`/survey/responden/${id}`)
    return response.data
  }

  static async findAllQuestion(params) {
    const response = await apiPortalPerumahan.get('/survey/question/all', {
      params,
    })
    return response.data
  }

  static async createResponden(body) {
    const response = await apiPortalPerumahan.post(
      '/survey/responden',
      body
    )
    return response.data
  }

  static async updateResponden(id, body) {
    const response = await apiPortalPerumahan.put(
      `/survey/responden/${id}`,
      body
    )
    return response.data
  }
  
  static async createAnswer(body) {
    const response = await apiPortalPerumahan.post(
      '/survey/answer',
      body
    )
    return response.data
  }

}

export default SurveyService
