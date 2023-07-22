import { faker } from "@faker-js/faker"
import { Program } from "../src/models"

export function generatePrograms(): Program[] {
    return faker.helpers.multiple(() => generateProgram(), { count: 3 })
}

export function generateProgram(): Program {
    return {
        id: faker.number.int({ min: 0, max: 50 }),
        title: faker.commerce.productName(),
        topic: faker.commerce.department(),
        learningFormats: faker.helpers.multiple(() => faker.commerce.productAdjective(), {
            count: 3
        }),
        bestseller: faker.datatype.boolean(),
        startDate: faker.date.anytime().toISOString()
    }
}
