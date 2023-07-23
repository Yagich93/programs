import { injectable } from "inversify"
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
        const programIndex = this.programs.findIndex((program) => program.id === id)
        this.programs.splice(programIndex)
    }
}
