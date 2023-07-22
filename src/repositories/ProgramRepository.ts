import { injectable } from "inversify"
import { Program } from "../models"

@injectable()
export class ProgramRepository {
    async listPrograms(): Promise<Program[]> {
        throw new Error("Method not implemented.")
    }
}
