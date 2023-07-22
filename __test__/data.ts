import { faker } from "@faker-js/faker"
import { LearningFormat, Program, ProgramData } from "../src/models"

export function generatePrograms(): Program[] {
    return faker.helpers.multiple(() => generateProgram(), { count: 3 })
}

export function generateProgram(programData: ProgramData = generateProgramData()): Program {
    return {
        id: faker.number.int({ min: 0, max: 50 }),
        ...programData
    }
}

export function generateProgramData(): ProgramData {
    return {
        title: faker.commerce.productName(),
        topic: faker.commerce.department(),
        learningFormats: faker.helpers.multiple(
            () => faker.helpers.arrayElement(Object.values(LearningFormat)),
            {
                count: 3
            }
        ),
        bestseller: faker.datatype.boolean(),
        startDate: faker.date.anytime().toISOString()
    }
}
