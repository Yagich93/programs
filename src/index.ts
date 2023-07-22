import "reflect-metadata"
import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import * as bodyParser from "body-parser"

import { TYPES } from "./types"
import { errorMiddleware, ValidatorMiddleware } from "./middlewares"
import "./controllers"
import { ProgramService } from "./services"
import { ProgramRepository } from "./repositories"

const container = new Container()

container.bind<ProgramService>(TYPES.ProgramService).to(ProgramService).inSingletonScope()
container.bind<ProgramRepository>(TYPES.ProgramRepository).to(ProgramRepository).inSingletonScope()
container
    .bind<ValidatorMiddleware>(TYPES.ValidatorMiddleware)
    .to(ValidatorMiddleware)
    .inSingletonScope()

const server = new InversifyExpressServer(container)

server
    .setConfig((app) => {
        app.use(bodyParser.json())
    })
    .setErrorConfig((app) => {
        app.use(errorMiddleware)
    })
    .build()
    .listen(3000, () => console.log("Listening on port 3000"))
