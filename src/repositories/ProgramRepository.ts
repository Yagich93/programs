import { injectable } from "inversify"
import { Program } from "../models"

@injectable()
export class ProgramRepository {
    private programs: Program[] = []

    async listPrograms(): Promise<Program[]> {
        return this.programs
    }
}
