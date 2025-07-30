import { mkApiAspirasi } from "../../../helpers/internalApi"

class FilterService {

  static async findAllTahunUsulan(params, accessTokenInternal) {
    const apiAspirasiWithAuth  = mkApiAspirasi(accessTokenInternal)
    const response = await apiAspirasiWithAuth.get('/filter/tahunusulan', {
      params,
    })
    return response.data
  }

}

export default FilterService
