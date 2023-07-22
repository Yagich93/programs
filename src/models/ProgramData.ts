import { LearningFormat } from "./LearningFormat"

export interface ProgramData {
    title: string
    topic: string
    learningFormats: LearningFormat[]
    bestseller: boolean
    startDate: string
}
