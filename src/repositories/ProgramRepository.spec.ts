import "reflect-metadata"
import { faker } from "@faker-js/faker"

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
        let nextId: number

        beforeEach(() => {
            programData = generateProgramData()
            nextId = faker.number.int(100)
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

        it("should assign next available id", async () => {
            programRepository["nextId"] = nextId

            const program = await programRepository.addProgram(programData)

            expect(program.id).toEqual(nextId)
        })

        it("should increment next available id", async () => {
            programRepository["nextId"] = nextId

            await programRepository.addProgram(programData)

            expect(programRepository["nextId"]).toEqual(nextId + 1)
        })
    })
})
