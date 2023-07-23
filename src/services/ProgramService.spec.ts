import "reflect-metadata"
import { Mock } from "ts-mockery"
import { faker } from "@faker-js/faker"

import { Program, ProgramData } from "../models"
import { ProgramService } from "./ProgramService"
import { ProgramRepository } from "../repositories"
import { generateProgram, generateProgramData, generatePrograms } from "../../__test__/data"

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

    describe("addProgram", () => {
        let programData: ProgramData
        let expectedProgram: Program

        beforeEach(() => {
            programData = generateProgramData()
            expectedProgram = generateProgram(programData)

            programRepository.addProgram = jest.fn().mockResolvedValue(expectedProgram)
        })

        it("should request program creation from repository", async () => {
            await programService.addProgram(programData)

            expect(programRepository.addProgram).toHaveBeenCalledWith(programData)
        })

        it("should return added program", async () => {
            const program = await programService.addProgram(programData)

            expect(program).toEqual(expectedProgram)
        })
    })

    describe("deleteProgram", () => {
        let id: number

        beforeEach(() => {
            id = faker.number.int(100)

            programRepository.deleteProgram = jest.fn()
        })

        it("should pass program id to service", async () => {
            await programService.deleteProgram(id)

            expect(programRepository.deleteProgram).toHaveBeenCalledWith(id)
        })

        it("should return nothing", async () => {
            const result = await programService.deleteProgram(id)

            expect(result).toBeUndefined()
        })
    })

    describe("updateProgram", () => {
        let id: number
        let programData: ProgramData
        let expectedProgram: Program

        beforeEach(() => {
            id = faker.number.int(100)
            programData = generateProgramData()
            expectedProgram = { ...generateProgram(programData), id }

            programRepository.updateProgram = jest.fn().mockResolvedValue(expectedProgram)
        })

        it("should pass program id and data to service", async () => {
            await programService.updateProgram(id, programData)

            expect(programRepository.updateProgram).toHaveBeenCalledWith(id, programData)
        })

        it("should return updated program", async () => {
            const program = await programService.updateProgram(id, programData)

            expect(program).toEqual(expectedProgram)
        })
    })
})
