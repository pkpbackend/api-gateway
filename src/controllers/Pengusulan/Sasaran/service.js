import { mkApiPengusulan } from "../../../helpers/internalApi"

class SasaranService {

  static async findVertekBySasaranId(id, accessTokenInternal) {
    const apiPengusulanWithAuth  = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(`/sasaran/${id}/vertek`)
    return response.data
  }

  static async updateVertekBySasaranId(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth  = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.post(`/sasaran/${id}/vertek`, body)
    return response.data
  }

}

export default SasaranService
