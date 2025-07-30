import { mkApiPengusulan } from "../../../helpers/internalApi"

class FilterService {

  static async findAllTahunUsulan(params, accessTokenInternal) {
    const apiPengusulanWithAuth  = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get('/filter/tahunusulan', {
      params,
    })
    return response.data
  }

}

export default FilterService
