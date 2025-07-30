import {
  mkExApiSSO,
  mkExApiPengusulan,
  mkExApiMaster,
} from '../../helpers/internalApi'

const exApiSSO = mkExApiSSO()
const exApiPengusulan = mkExApiPengusulan()
const exApiMaster = mkExApiMaster()

class ExapiService {
  static async banperLogin(body) {
    const response = await exApiSSO.post('/banper/account/login', body)
    return response.data
  }

  static async findBanperAccount(body) {
    const response = await exApiSSO.post('/banper/account', body)
    return response.data
  }

  static async requestBanperOtp(body) {
    const response = await exApiSSO.post('/banper/request-otp', body)
    return response.data
  }

  static async findBanperMonitor(params) {
    const response = await exApiPengusulan.get('/banper/monitor', {
      params,
    })

    return response.data
  }

  static async login(body) {
    const response = await exApiSSO.post('/login', body)
    return response.data
  }

  static async findUsulan(params) {
    const response = await exApiPengusulan.get('/usulan', {
      params,
    })

    return response.data
  }

  static async findPemanfaatanMaster(params) {
    const response = await exApiMaster.get('/pemanfaatan/master', {
      params,
    })

    return response.data
  }

  static async findPemanfaatanRusunawa(params) {
    const response = await exApiMaster.get('/pemanfaatan/rusunawa', {
      params,
    })

    return response.data
  }

  static async findPemanfaatanRusus(params) {
    const response = await exApiMaster.get('/pemanfaatan/rusus', {
      params,
    })

    return response.data
  }

  static async findPemanfaatanBSPS(params) {
    const response = await exApiMaster.get('/pemanfaatan/bsps', {
      params,
    })

    return response.data
  }

  static async findPemanfaatanPSU(params) {
    const response = await exApiMaster.get('/pemanfaatan/psu', {
      params,
    })

    return response.data
  }

  static async findDataRTLH(params) {
    const response = await exApiMaster.get('/rtlh/data-rtlh', {
      params,
    })

    return response.data
  }

  static async findDataRTLHSulteng(params) {
    const response = await exApiMaster.get('/proxy/sulteng/data-rtlh', {
      params,
    })

    return response.data
  }

  static async findERTLH(params) {
    const response = await exApiMaster.get('/proxy/e-rtlh/data-rtlh', {
      params,
    })

    return response.data
  }

  static async findDirektoratUsulan(req) {
    const { query } = req
    const response = await mkExApiPengusulan(req.data.token).get(
      '/apidir/usulan',
      {
        params: query,
      }
    )

    return response.data
  }

  static async findDirektoratDetailUsulan(req) {
    const {
      params: { id },
    } = req
    const response = await mkExApiPengusulan(req.data.token).get(
      `/apidir/usulan/${id}`
    )

    return response.data
  }
}

export default ExapiService
