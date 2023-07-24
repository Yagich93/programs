import { inject } from "inversify"
import {
    controller,
    httpDelete,
    httpGet,
    httpPost,
    httpPut,
    interfaces,
    requestBody,
    requestParam,
    response
} from "inversify-express-utils"
import { Body, Delete, Get, Inject, Post, Put, Response, Route, SuccessResponse } from "tsoa"
import * as express from "express"

import { Program, ProgramData } from "../models"
import { ProgramService } from "../services/ProgramService"
import { TYPES } from "../types"
import {
    ADD_PROGRAM_VALIDATORS,
    DELETE_PROGRAM_VALIDATORS,
    UPDATE_PROGRAM_VALIDATORS
} from "./validators"
import { ErrorResponse, ValidationErrorResponse } from "../middlewares"

@Route("/programs")
@controller("/programs")
export class ProgramController implements interfaces.Controller {
    constructor(@inject(TYPES.ProgramService) private programService: ProgramService) {}

    /**
     * @summary List programs
     */
    @Get("/")
    @httpGet("/")
    async listPrograms(): Promise<Program[]> {
        return this.programService.listPrograms()
    }

    /**
     * @summary Add program
     */
    @Post("/")
    @SuccessResponse("201", "Created")
    @Response<ValidationErrorResponse>(422, "Validation Failed")
    @httpPost("/", ...ADD_PROGRAM_VALIDATORS)
    async addProgram(
        @Body() @requestBody() programData: ProgramData,
        @Inject() @response() res: express.Response
    ): Promise<Program> {
        res.status(201)
        return this.programService.addProgram(programData)
    }

    /**
     * @summary Delete program
     */
    @Delete("/{id}")
    @Response<ErrorResponse>(404, "Program Not Found")
    @httpDelete("/:id", ...DELETE_PROGRAM_VALIDATORS)
    async deleteProgram(@requestParam("id") id: number): Promise<void> {
        return this.programService.deleteProgram(id)
    }

    /**
     * @summary Update program
     */
    @Put("/{id}")
    @Response<ValidationErrorResponse>(422, "Validation Failed")
    @Response<ErrorResponse>(404, "Program Not Found")
    @httpPut("/:id", ...UPDATE_PROGRAM_VALIDATORS)
    async updateProgram(
        @requestParam("id") id: number,
        @Body() @requestBody() programData: ProgramData
    ): Promise<Program> {
        return this.programService.updateProgram(id, programData)
    }
}
