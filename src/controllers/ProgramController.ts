import { inject } from "inversify"
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    requestBody,
    requestParam
} from "inversify-express-utils"

import { Program, ProgramData } from "../models"
import { ProgramService } from "../services/ProgramService"
import { TYPES } from "../types"
import {
    ADD_PROGRAM_VALIDATORS,
    DELETE_PROGRAM_VALIDATORS,
    UPDATE_PROGRAM_VALIDATORS
} from "./validators"

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

    @httpDelete("/:id", ...DELETE_PROGRAM_VALIDATORS)
    async deleteProgram(@requestParam("id") id: number): Promise<void> {
        return this.programService.deleteProgram(id)
    }

    @httpPut("/:id", ...UPDATE_PROGRAM_VALIDATORS)
    async updateProgram(id: number, programData: ProgramData): Promise<Program> {
        return this.programService.updateProgram(id, programData)
    }
}
