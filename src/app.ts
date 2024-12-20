//APP.TS

//Import de dotenv
import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import apiRouter from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerDocumentation from './config/openapi.json'
import { handleError } from './middlewares/handleError'
import { loggError } from './middlewares/loggError'

//Clase App -----------------------------------------
export class App {
  app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.setting()
    this.middlewares()
  }

  setting() {
    this.app.set('port', this.port || process.env.PORT || 3000)
  }

  startServer() {
    const server = this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
    server.on('error', (error: NodeJS.ErrnoException) => {
      console.log('Error al inicial el servidor', error.message)
    })
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(loggError)
    this.app.use(handleError)
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        //origin: 'http://localhost:80',
        credentials: true,
      }),
    )
    this.app.use('/api', apiRouter)
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation))
  }
}
