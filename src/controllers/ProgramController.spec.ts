import "reflect-metadata"
import { Mock } from "ts-mockery"

import { ProgramController } from "./ProgramController"
import { Program, ProgramData } from "../models"
import { ProgramService } from "../services"
import { generateProgram, generateProgramData, generatePrograms } from "../../__test__/data"

describe("ProgramController", () => {
    const programService = Mock.of<ProgramService>()
    const programController = new ProgramController(programService)

    describe("listPrograms", () => {
        let expectedPrograms: Program[]

        beforeEach(() => {
            expectedPrograms = generatePrograms()

            programService.listPrograms = jest.fn().mockResolvedValue(expectedPrograms)
        })

        it("should return program list", async () => {
            const programs = await programController.listPrograms()

            expect(programs).toEqual(expectedPrograms)
        })
    })

    describe("addProgram", () => {
        let programData: ProgramData
        let expectedProgram: Program

        beforeEach(() => {
            programData = generateProgramData()
            expectedProgram = generateProgram(programData)

            programService.addProgram = jest.fn().mockResolvedValue(expectedProgram)
        })

        it("should pass program data to service", async () => {
            await programController.addProgram(programData)

            expect(programService.addProgram).toHaveBeenCalledWith(programData)
        })

        it("should return added program", async () => {
            const program = await programController.addProgram(programData)

            expect(program).toEqual(expectedProgram)
        })
    })
})
