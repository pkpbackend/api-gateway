import {
  mkApiPengusulan,
} from "../../../helpers/internalApi"

class VerminService {

  static async update(id, body, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)
    const response = await apiPengusulanWithAuth.put(`/vermin/${id}`, body)
    return response.data
  }

  static async notificationEmail({ VerminId, ditRususVerminId }, filePdf, accessTokenInternal) {
    const apiPengusulanWithAuth = mkApiPengusulan(accessTokenInternal)

    if (filePdf) {
      const form = new FormData()

      const filePdfSource = `${filePdf.destination}${filePdf.filename}`
      const newFilePdf = fs.readFileSync(filePdfSource)

      form.append('VerminId', VerminId ? VerminId : '')
      form.append('ditRususVerminId', ditRususVerminId ? ditRususVerminId : '')
      form.append('filePdf', newFilePdf, filePdf.filename)

      fs.unlinkSync(filePdfSource)

      const response = await apiPengusulanWithAuth.post(
        '/vermin/notification-email',
        form,
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            ...form.getHeaders(),
          },
        }
      )

      return response.data
    }

    const response = await apiPengusulanWithAuth.post(
      '/vermin/notification-email',
      { VerminId, ditRususVerminId }
    )

    return response.data
  }

}

export default VerminService
