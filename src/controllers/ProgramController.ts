import { inject } from "inversify"
import { controller, httpGet, httpPost, interfaces, requestBody } from "inversify-express-utils"

import { Program, ProgramData } from "../models"
import { ProgramService } from "../services/ProgramService"
import { TYPES } from "../types"
import { ADD_PROGRAM_VALIDATORS } from "./validators"

@controller("/programs")
export class ProgramController implements interfaces.Controller {
    constructor(@inject(TYPES.ProgramService) private programService: ProgramService) {}

    @httpGet("/")
    async listPrograms(): Promise<Program[]> {
        return this.programService.listPrograms()
    }

    @httpPost("/", ...ADD_PROGRAM_VALIDATORS)
    async addProgram(@requestBody() programData: ProgramData): Promise<Program> {
        return this.programService.addProgram(programData)
    }
}
