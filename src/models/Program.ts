import { ProgramData } from "./ProgramData"

export interface Program extends ProgramData {
    /**
     * @isInt
     * @minimum 0
     */
    id: number
}
