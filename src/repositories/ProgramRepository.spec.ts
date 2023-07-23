import "reflect-metadata"
import { faker } from "@faker-js/faker"

import { ProgramRepository } from "./ProgramRepository"
import { generateProgram, generateProgramData, generatePrograms } from "../../__test__/data"
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

    describe("deleteProgram", () => {
        let id: number

        beforeEach(() => {
            id = faker.number.int({ min: 101, max: 200 })
            const program = { ...generateProgram(), id }

            programRepository["programs"] = [program]
        })

        it("should delete program with given id", async () => {
            await programRepository.deleteProgram(id)

            expect(programRepository["programs"]).not.toContain(expect.objectContaining({ id }))
        })

        it("should return nothing", async () => {
            const result = await programRepository.deleteProgram(id)

            expect(result).toBeUndefined()
        })

        it("should not remove other programs", async () => {
            const programsBefore = generatePrograms()
            const programsAfter = generatePrograms()
            programRepository["programs"] = [
                ...programsBefore,
                ...programRepository["programs"],
                ...programsAfter
            ]

            await programRepository.deleteProgram(id)

            expect(programRepository["programs"]).toEqual(
                expect.arrayContaining([...programsBefore, ...programsAfter])
            )
        })

        it("should throw if program not found", async () => {
            const nonExistentId = 100500

            await expect(programRepository.deleteProgram(nonExistentId)).rejects.toThrow(
                expect.objectContaining({ status: 404, message: "Program Not Found" })
            )
        })
    })
})
