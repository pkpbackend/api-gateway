import { mkApiMaster } from "../../../helpers/internalApi"

class WilayahService {
    static async syncWilayah(accessTokenInternal) {
        const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
        const response = await apiMasterWithAuth.get('/wilayah/sync')
        return response.data
    }
}

export default WilayahService