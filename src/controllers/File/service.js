import { getS3File } from '../../helpers/s3Helper'
import ResponseError from '../../modules/Error'

class FileService {
  static async findFile(s3key) {
    // const newName = name.replace(/\_/g,'/')
    let s3url

    try {
      s3url = await getS3File(s3key)
    } catch (error) {
      console.log(error)
      throw new ResponseError.BadRequest('Gagal mendapatkan S3 url')
    }

    return s3url
  }
}

export default FileService
