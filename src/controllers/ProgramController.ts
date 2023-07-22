import { inject } from "inversify"
import { controller, httpGet, interfaces } from "inversify-express-utils"

import { Program } from "../models"
import { ProgramService } from "../services/ProgramService"
import { TYPES } from "../types"

@controller("/programs")
export class ProgramController implements interfaces.Controller {
    constructor(@inject(TYPES.ProgramService) private programService: ProgramService) {}

    @httpGet("/")
    async listPrograms(): Promise<Program[]> {
        return this.programService.listPrograms()
    }
}
