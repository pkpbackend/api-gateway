import { mkApiPengusulan } from '../../../helpers/internalApi'

class DashboardPengusulanService {
  static async rekapitulasiDirektorat(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/direktorat',
      {
        params,
      }
    )
    return response.data
  }

  static async rekapitulasiProvinsi(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/provinsi',
      {
        params,
      }
    )
    return response.data
  }

  static async rekapitulasiKabupaten(id, params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      `/dashboard/rekapitulasi/kabupaten/${id}`,
      {
        params,
      }
    )
    return response.data
  }

  static async rekapitulasiPenerimaManfaat(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/penerima-manfaat',
      {
        params,
      }
    )
    return response.data
  }

  static async rekapitulasiJenisUsulan(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/jenis-usulan',
      {
        params,
      }
    )
    return response.data
  }

  static async rekapitulasiUsulan(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/usulan',
      {
        params,
      }
    )
    return response.data
  }

  static async exportRekapitulasiUsulanExcel(params, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.get(
      '/dashboard/rekapitulasi/usulan/export/excel',
      {
        params,
      }
    )
    return response.data
  }
}

export default DashboardPengusulanService
