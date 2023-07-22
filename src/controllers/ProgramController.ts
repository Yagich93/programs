import { inject } from "inversify"
import { controller, httpGet, httpPost, interfaces } from "inversify-express-utils"

import { Program, ProgramData } from "../models"
import { ProgramService } from "../services/ProgramService"
import { TYPES } from "../types"

@controller("/programs")
export class ProgramController implements interfaces.Controller {
    constructor(@inject(TYPES.ProgramService) private programService: ProgramService) {}

    @httpGet("/")
    async listPrograms(): Promise<Program[]> {
        return this.programService.listPrograms()
    }

    @httpPost("/")
    async addProgram(programData: ProgramData): Promise<Program> {
        return this.programService.addProgram(programData)
    }
}
