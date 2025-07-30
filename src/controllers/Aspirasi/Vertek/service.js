import fs from 'fs'
import FormData from 'form-data'
import { 
  mkApiAspirasi, 
} from "../../../helpers/internalApi"

class VertekService {

  static async update(
    id, 
    body, 
    fileFoto, 
    fileVertek,
    dataLapangan22,
    accessTokenInternal
  ) {
    const apiAspirasiWithAuth  = mkApiAspirasi(accessTokenInternal)

    if (fileFoto) {
      const form = new FormData()

      const fileFotoSource = `${fileFoto.destination}${fileFoto.filename}`
      const newFileFoto = fs.readFileSync(fileFotoSource)

      form.append('type', body.type?body.type:'')
      form.append('dokumenName', 'fileFoto')
      form.append('dokumenLapangan', newFileFoto, fileFoto.filename)

      fs.unlinkSync(fileFotoSource)
    
      await apiAspirasiWithAuth.put(
        `/vertek/${id}/dokumen-lapangan`, 
        form, 
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    }

    if (fileVertek) {
      const form = new FormData()

      const fileVertekSource = `${fileVertek.destination}${fileVertek.filename}`
      const newFileVertek = fs.readFileSync(fileVertekSource)

      form.append('type', body.type?body.type:'')
      form.append('dokumenName', 'fileVertek')
      form.append('dokumenLapangan', newFileVertek, fileVertek.filename)

      fs.unlinkSync(fileVertekSource)
    
      await apiAspirasiWithAuth.put(
        `/vertek/${id}/dokumen-lapangan`, 
        form, 
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    }

    if (dataLapangan22) {
      const form = new FormData()

      const dataLapangan22Source = `${dataLapangan22.destination}${dataLapangan22.filename}`
      const newDataLapangan22 = fs.readFileSync(dataLapangan22Source)

      form.append('type', body.type?body.type:'')
      form.append('dokumenName', 'dataLapangan22')
      form.append('dokumenLapangan', newDataLapangan22, dataLapangan22.filename)

      fs.unlinkSync(dataLapangan22Source)
    
      await apiAspirasiWithAuth.put(
        `/vertek/${id}/dokumen-lapangan`, 
        form, 
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )
    }

    const response = await apiAspirasiWithAuth.put(`/vertek/${id}`, body)
    return response.data
  }

}

export default VertekService
