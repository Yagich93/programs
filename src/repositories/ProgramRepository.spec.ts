import "reflect-metadata"

import { ProgramRepository } from "./ProgramRepository"
import { generateProgramData, generatePrograms } from "../../__test__/data"
import { Program, ProgramData } from "../models"

describe("ProgramRepository", () => {
    const programRepository = new ProgramRepository()

    describe("listPrograms", () => {
        let expectedPrograms: Program[]

        beforeEach(() => {
            expectedPrograms = generatePrograms()

            programRepository["programs"] = expectedPrograms
        })

        it("should return program list", async () => {
            const programs = await programRepository.listPrograms()

            expect(programs).toEqual(expectedPrograms)
        })
    })

    describe("addProgram", () => {
        let programData: ProgramData

        beforeEach(() => {
            programData = generateProgramData()
        })

        afterEach(() => {
            jest.useRealTimers()
        })

        it("should save given program data", async () => {
            await programRepository.addProgram(programData)

            expect(programRepository["programs"]).toContainEqual(
                expect.objectContaining(programData)
            )
        })

        it("should return saved program", async () => {
            const program = await programRepository.addProgram(programData)

            expect(program).toEqual(expect.objectContaining(programData))
        })
    })
})
