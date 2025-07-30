import { mkApiMaster } from '../../../helpers/internalApi'

const apiMaster = mkApiMaster()

class DashboardMasterService {
  static async findAllMap(params) {
    const newParams = {
      ...params,
    }
    if (params.idType) {
      newParams.TypeId = params.idType
    }
    const response = await apiMaster.get('/dashboard/map', {
      params: newParams,
    })
    return response.data
  }

  static async findSummary(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/summary',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapDetail(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap/detail',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekap(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap',
      {
        params,
      }
    )
    return response.data
  }

  static async exportExcelRekap(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async exportExcelRekapPerTahun(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-per-tahun/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapPerProvinsiDanKategori(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap/per-provinsi-dan-kategori',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapPengisianData(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-pengisian-data',
      {
        params,
      }
    )
    return response.data
  }

  static async exportExcelRekapPengisianData(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-pengisian-data/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapKeterisian(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-keterisian',
      {
        params,
      }
    )
    return response.data
  }

  static async exportExcelRekapKeterisian(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-keterisian/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapKeterisianPerProvinsi(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-keterisian/per-provinsi',
      {
        params,
      }
    )
    return response.data
  }

  static async exportExcelRekapKeterisianPerProvinsi(
    params,
    accessTokenInternal
  ) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-keterisian/per-provinsi/export/excel',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapPeresmian(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/pemanfaatan/rekap-peresmian',
      {
        params,
      }
    )
    return response.data
  }

  static async findRp3kp(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get('/dashboard/profile/rp3kp', {
      params,
    })
    return response.data
  }

  static async findPokjaPkp(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/profile/pokja-pkp',
      {
        params,
      }
    )
    return response.data
  }

  static async findForumPkp(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/profile/forum-pkp',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapP3ke(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/profile/rekap-p3ke',
      {
        params,
      }
    )
    return response.data
  }

  static async findRekapP3keKabKota(params, accessTokenInternal) {
    const apiMasterWithAuth = mkApiMaster(accessTokenInternal)
    const response = await apiMasterWithAuth.get(
      '/dashboard/profile/rekap-p3ke-kabkota',
      {
        params,
      }
    )
    return response.data
  }
}

export default DashboardMasterService
