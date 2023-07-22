import { inject, injectable } from "inversify"

import { Program } from "../models"
import { ProgramRepository } from "../repositories"
import { TYPES } from "../types"

@injectable()
export class ProgramService {
    constructor(@inject(TYPES.ProgramRepository) private programRepository: ProgramRepository) {}

    async listPrograms(): Promise<Program[]> {
        return this.programRepository.listPrograms()
    }
}
