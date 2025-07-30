import { mkApiMaster } from '../../../helpers/internalApi'
class ProvinsiService {
  static async findAll(params, accessTokenInternal) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.get('/helpdesk', {
      params,
    })
    return response.data
  }

  static async findAllChat(params, accessTokenInternal = null) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.get('/helpdesk/chats', {
      params,
    })
    return response.data
  }

  static async findAllTopdis(params, accessTokenInternal = null) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.get('/helpdesk/topik-diskusi', {
      params,
    })
    return response.data
  }

  static async findProfile(id, accessTokenInternal) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.get(`/helpdesk/check-my-acc`)
    return response.data
  }

  static async findById(id, accessTokenInternal = null) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.get(`/helpdesk/${id}`)
    return response.data
  }

  static async create(body, accessTokenInternal = null) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.post('/helpdesk', body)
    return response.data
  }

  static async resetTopdis(body, accessTokenInternal) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.post('/helpdesk/reset-topdis', body)
    return response.data
  }

  static async createChat(helpdeskId, body, accessTokenInternal = null) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.post(
      `/helpdesk/${helpdeskId}/chat`,
      body
    )
    return response.data
  }

  static async update(helpdeskId, body, accessTokenInternal) {
    const reqHelpdesk = mkApiMaster(accessTokenInternal)
    const response = await reqHelpdesk.put(`/helpdesk/${helpdeskId}`, body)
    return response.data
  }
}

export default ProvinsiService
