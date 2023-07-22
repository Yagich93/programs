import "reflect-metadata"
import { Mock } from "ts-mockery"

import { ProgramController } from "./ProgramController"
import { Program } from "../models"
import { ProgramService } from "../services"
import { generatePrograms } from "../../__test__/data"

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
})
