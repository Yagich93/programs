import { LearningFormat } from "./LearningFormat"

export interface ProgramData {
    /**
     * Allowed only letters, numbers, '-', '_', ' '
     * @minLength 1
     * @maxLength 100
     */
    title: string

    /**
     * Allowed only lowercase letters, numbers, '-'
     * @minLength 1
     * @maxLength 100
     */
    topic: string

    /**
     * @minItems 1
     */
    learningFormats: LearningFormat[]

    bestseller: boolean

    /**
     * ISO8601 Date
     */
    startDate: string
}
