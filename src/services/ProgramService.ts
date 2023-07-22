import { injectable } from "inversify"
import { Program } from "../models"

@injectable()
export class ProgramService {
    async listPrograms(): Promise<Program> {
        throw new Error("Method not implemented.")
    }
}
