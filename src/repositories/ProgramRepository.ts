import { injectable } from "inversify"
import { Program, ProgramData } from "../models"

@injectable()
export class ProgramRepository {
    private programs: Program[] = []

    async listPrograms(): Promise<Program[]> {
        return this.programs
    }

    async addProgram(_programData: ProgramData): Promise<Program> {
        throw new Error("Not implemented")
    }
}
