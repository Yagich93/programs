import { inject, injectable } from "inversify"

import { Program, ProgramData } from "../models"
import { ProgramRepository } from "../repositories"
import { TYPES } from "../types"

@injectable()
export class ProgramService {
    constructor(@inject(TYPES.ProgramRepository) private programRepository: ProgramRepository) {}

    async listPrograms(): Promise<Program[]> {
        return this.programRepository.listPrograms()
    }

    async addProgram(programData: ProgramData): Promise<Program> {
        return this.programRepository.addProgram(programData)
    }

    async deleteProgram(id: number): Promise<void> {
        return this.programRepository.deleteProgram(id)
    }

    async updateProgram(id: number, programData: ProgramData): Promise<Program> {
        return this.programRepository.updateProgram(id, programData)
    }
}
