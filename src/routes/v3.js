import Express from 'express'

import HomeController from '../controllers/Home/controller'
import ExapiController from '../controllers/Exapi/controller'

// SSO
import AccountController from '../controllers/SSO/Account/controller'
import UserController from '../controllers/SSO/User/controller'
// import KeycloakSyncController from '../controllers/SSO/KeycloakSync/controller'
import RoleController from '../controllers/SSO/Role/controller'
import ScopeRegionRoleController from '../controllers/SSO/ScopeRegionRole/controller'
import AccessMenuController from '../controllers/SSO/AccessMenu/controller'

import FileController from '../controllers/File/controller'

// Master
import DirektoratController from '../controllers/Master/Direktorat/controller'
import KomponenPengajuanController from '../controllers/Master/KomponenPengajuan/controller'
import MasterDokumenController from '../controllers/Master/MasterDokumen/controller'
import MasterKategoriDokumenController from '../controllers/Master/MasterKategoriDokumen/controller'
import MasterKegiatanController from '../controllers/Master/MasterKegiatan/controller'
import MasterKegiatanOporController from '../controllers/Master/MasterKegiatanOpor/controller'
import MasterKelompokPengusulController from '../controllers/Master/MasterKelompokPengusul/controller'
import MasterTematikPemanfaatanController from '../controllers/Master/MasterTematikPemanfaatan/controller'
import MasterKondisiBangunanController from '../controllers/Master/MasterKondisiBangunan/controller'
import PenerimaManfaatController from '../controllers/Master/PenerimaManfaat/controller'
import PengembangController from '../controllers/Master/Pengembang/controller'
import PerusahaanController from '../controllers/Master/Perusahaan/controller'
import ProvinsiController from '../controllers/Master/Wilayah/Provinsi/controller'
import KecamatanController from '../controllers/Master/Wilayah/Kecamatan/controller'
import CityController from '../controllers/Master/Wilayah/City/controller'
import DesaController from '../controllers/Master/Wilayah/Desa/controller'
import ProvinsiCrudController from '../controllers/Master/Provinsi/controller'
import KecamatanCrudController from '../controllers/Master/Kecamatan/controller'
import CityCrudController from '../controllers/Master/City/controller'
import DesaCrudController from '../controllers/Master/Desa/controller'
// import PengumumanController from '../controllers/Master/Pengumuman/controller'
import PemanfaatanController from '../controllers/Master/Pemanfaatan/controller'
import FilterController from '../controllers/Master/Filter/controller'
import HelpdeskController from '../controllers/Master/Helpdesk/controller'
import ProprogramController from '../controllers/Master/ProProgram/controller'
import ProkegiatanController from '../controllers/Master/ProKegiatan/controller'
import ProoutputController from '../controllers/Master/ProOutput/controller'
import SerahTerimaController from '../controllers/Master/SerahTerima/controller'
import PembangunanController from '../controllers/Master/Pembangunan/controller'
import WilayahController from '../controllers/Master/Wilayah/controller'

// Portal Perumahan
import BannerController from '../controllers/PortalPerumahan/Banner/controller'
import FaqPortalPerumahanController from '../controllers/PortalPerumahan/Faq/controller'
import PeraturanPortalPerumahanController from '../controllers/PortalPerumahan/Peraturan/controller'
import ContentSettingController from '../controllers/PortalPerumahan/ContentSetting/controller'
import SettingController from '../controllers/PortalPerumahan/Setting/controller'
import NotificationController from '../controllers/PortalPerumahan/Notification/controller'
import SurveyController from '../controllers/PortalPerumahan/Survey/controller'
import PengumumanController from '../controllers/PortalPerumahan/Pengumuman/controller'

// Pengusulan
// import PengusulanController from '../controllers/Pengusulan/controller'
import PengusulanUsulanController from '../controllers/Pengusulan/Usulan/controller'
import PengusulanSasaranController from '../controllers/Pengusulan/Sasaran/controller'
import PengusulanDokumenController from '../controllers/Pengusulan/Dokumen/controller'
import PengusulanVerminController from '../controllers/Pengusulan/Vermin/controller'
import PengusulanVertekController from '../controllers/Pengusulan/Vertek/controller'
import PengusulanFilterController from '../controllers/Pengusulan/Filter/controller'
import PengusulanPenetapanController from '../controllers/Pengusulan/Penetapan/controller'
import PengusulanPrioritasController from '../controllers/Pengusulan/Prioritas/controller'
import KonregPoolController from '../controllers/Pengusulan/KonregPool/controller'

// Aspirasi
import AspirasiUsulanController from '../controllers/Aspirasi/Usulan/controller'
import AspirasiSasaranController from '../controllers/Aspirasi/Sasaran/controller'
import AspirasiVerminController from '../controllers/Aspirasi/Vermin/controller'
import AspirasiVertekController from '../controllers/Aspirasi/Vertek/controller'
import AspirasiDokumenController from '../controllers/Aspirasi/Dokumen/controller'
import AspirasiFilterController from '../controllers/Aspirasi/Filter/controller'

// Dashboard
import DashboardPortalController from '../controllers/Dashboard/Portal/controller'
import DashboardMasterController from '../controllers/Dashboard/Master/controller'
import DasboardPengusulanController from '../controllers/Dashboard/Pengusulan/controller'

const route = Express.Router()

route.use('/exapi', ExapiController)
route.use('/v3', HomeController)

// SSO
route.use('/v3/sso/account', AccountController)
route.use('/v3/sso/user', UserController)
// route.use('/v3/sso/sync', KeycloakSyncController)
route.use('/v3/sso/role', RoleController)
route.use('/v3/sso/scoperegionrole', ScopeRegionRoleController)
route.use('/v3/sso/accessmenu', AccessMenuController)

route.use('/file', FileController)

// Master
route.use('/v3/master/direktorat', DirektoratController)
route.use('/v3/master/komponenpengajuan', KomponenPengajuanController)
route.use('/v3/master/masterdokumen', MasterDokumenController)
route.use('/v3/master/masterkategoridokumen', MasterKategoriDokumenController)
route.use('/v3/master/masterkegiatan', MasterKegiatanController)
route.use('/v3/master/masterkegiatanopor', MasterKegiatanOporController)
route.use('/v3/master/masterkelompokpengusul', MasterKelompokPengusulController)
route.use(
  '/v3/master/mastertematikpemanfaatan',
  MasterTematikPemanfaatanController
)
route.use('/v3/master/masterkondisibangunan', MasterKondisiBangunanController)
route.use('/v3/master/penerimamanfaat', PenerimaManfaatController)
route.use('/v3/master/pengembang', PengembangController)
route.use('/v3/master/perusahaan', PerusahaanController)
route.use('/v3/master/wilayah/provinsi', ProvinsiController)
route.use('/v3/master/wilayah/kecamatan', KecamatanController)
route.use('/v3/master/wilayah/city', CityController)
route.use('/v3/master/wilayah/desa', DesaController)
route.use('/v3/master/provinsi', ProvinsiCrudController)
route.use('/v3/master/kecamatan', KecamatanCrudController)
route.use('/v3/master/city', CityCrudController)
route.use('/v3/master/desa', DesaCrudController)
// route.use('/v3/master/pengumuman', PengumumanController)
route.use('/v3/master/pemanfaatan', PemanfaatanController)
route.use('/v3/master/filter', FilterController)
route.use('/v3/master/helpdesk', HelpdeskController)
route.use('/v3/master/pro/program', ProprogramController)
route.use('/v3/master/pro/kegiatan', ProkegiatanController)
route.use('/v3/master/pro/output', ProoutputController)
route.use('/v3/master/serahterima', SerahTerimaController)
route.use('/v3/master/pembangunan', PembangunanController)
route.use('/v3/master/wilayah', WilayahController)

// Portal Perumahan
route.use('/v3/portalperumahan/banner', BannerController)
route.use('/v3/portalperumahan/faq', FaqPortalPerumahanController)
route.use('/v3/portalperumahan/peraturan', PeraturanPortalPerumahanController)
route.use('/v3/portalperumahan/pengaturan', ContentSettingController)
route.use('/v3/portalperumahan/setting', SettingController)
route.use('/v3/portalperumahan/notification', NotificationController)
route.use('/v3/portalperumahan/survey', SurveyController)
route.use('/v3/portalperumahan/pengumuman', PengumumanController)

// Pengusulan
// route.use('/v3/pengusulan', PengusulanController)
route.use('/v3/pengusulan/usulan', PengusulanUsulanController)
route.use('/v3/pengusulan/sasaran', PengusulanSasaranController)
route.use('/v3/pengusulan/dokumen', PengusulanDokumenController)
route.use('/v3/pengusulan/vermin', PengusulanVerminController)
route.use('/v3/pengusulan/vertek', PengusulanVertekController)
route.use('/v3/pengusulan/filter', PengusulanFilterController)
route.use('/v3/pengusulan/penetapan', PengusulanPenetapanController)
route.use('/v3/pengusulan/prioritas', PengusulanPrioritasController)
route.use('/v3/pengusulan/konregpool', KonregPoolController)

// Aspirasi
route.use('/v3/aspirasi/usulan', AspirasiUsulanController)
route.use('/v3/aspirasi/sasaran', AspirasiSasaranController)
route.use('/v3/aspirasi/dokumen', AspirasiDokumenController)
route.use('/v3/aspirasi/vermin', AspirasiVerminController)
route.use('/v3/aspirasi/vertek', AspirasiVertekController)
route.use('/v3/aspirasi/filter', AspirasiFilterController)

// Dashboard
route.use('/v3/dashboard', DashboardPortalController)
route.use('/v3/dashboard', DashboardMasterController)
route.use('/v3/dashboard', DasboardPengusulanController)

export default route
