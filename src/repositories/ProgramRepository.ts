import { injectable } from "inversify"
import { Program, ProgramData } from "../models"

@injectable()
export class ProgramRepository {
    private programs: Program[] = []

    async listPrograms(): Promise<Program[]> {
        return this.programs
    }

    async addProgram(programData: ProgramData): Promise<Program> {
        const id = 0
        const program = { ...programData, id }
        this.programs.push(program)
        return program
    }
}
