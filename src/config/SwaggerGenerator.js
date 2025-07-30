import path from 'path'
import swaggerAutogen from 'swagger-autogen'
import { APP_PORT } from './env'

const doc = {
  info: {
    title: "Sibaru API v3 Documentation",
    description: "This is all documentation of API of Sibaru API v3"
  },
  host: `localhost:${APP_PORT}`,
  schemes: ['http']
}

const outputFile = path.resolve(`${__dirname}/../../docs/path/swagger-output.json`)
const endpointsFiles = [path.resolve(`${__dirname}/../routes/index.js`)]

swaggerAutogen()(outputFile, endpointsFiles, doc)