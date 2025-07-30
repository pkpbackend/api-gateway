import { mkApiAspirasi } from "../../../helpers/internalApi"

class SasaranService {

  static async findVertekBySasaranId(id, accessTokenInternal) {
    const apiAspirasiWithAuth  = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get(`/sasaran/${id}/vertek`)
    return response.data
  }

  static async updateVertekBySasaranId(id, body, accessTokenInternal) {
    const apiAspirasiWithAuth  = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.post(`/sasaran/${id}/vertek`, body)
    return response.data
  }

}

export default SasaranService
