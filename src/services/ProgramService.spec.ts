import "reflect-metadata"
import { Mock } from "ts-mockery"

import { Program } from "../models"
import { ProgramService } from "./ProgramService"
import { ProgramRepository } from "../repositories"
import { generatePrograms } from "../../__test__/data"

describe("ProgramService", () => {
    const programRepository = Mock.of<ProgramRepository>()
    const programService = new ProgramService(programRepository)

    describe("getProgram", () => {
        let expectedPrograms: Program[]

        beforeEach(() => {
            expectedPrograms = generatePrograms()

            programRepository.listPrograms = jest.fn().mockResolvedValue(expectedPrograms)
        })

        it("should return found program", async () => {
            const programs = await programService.listPrograms()

            expect(programs).toEqual(expectedPrograms)
        })
    })
})
