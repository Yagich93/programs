import { injectable } from "inversify"
import { NotFound } from "http-errors"

import { Program, ProgramData } from "../models"

@injectable()
export class ProgramRepository {
    private programs: Program[] = []
    private nextId = 0

    async listPrograms(): Promise<Program[]> {
        return this.programs
    }

    async addProgram(programData: ProgramData): Promise<Program> {
        const id = this.nextId++
        const program = { ...programData, id }
        this.programs.push(program)
        return program
    }

    async deleteProgram(id: number): Promise<void> {
        const programIndex = this.findProgramIndex(id)

        this.programs.splice(programIndex, 1)
    }

    async updateProgram(id: number, programData: ProgramData): Promise<Program> {
        const programIndex = this.findProgramIndex(id)

        return Object.assign(this.programs[programIndex], programData)
    }

    private findProgramIndex(id: number): number {
        const programIndex = this.programs.findIndex((program) => program.id === id)

        if (programIndex < 0) {
            throw new NotFound("Program Not Found")
        }

        return programIndex
    }
}
