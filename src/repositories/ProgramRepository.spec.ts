import "reflect-metadata"

import { ProgramRepository } from "./ProgramRepository"
import { generatePrograms } from "../../__test__/data"
import { Program } from "../models"

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
})
