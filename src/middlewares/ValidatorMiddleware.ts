import { injectable } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"
import { ValidationError, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "./errorMiddleware"

export interface ValidationErrorResponse extends ErrorResponse {
    errors: ValidationError[]
}

@injectable()
export class ValidatorMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction): void {
        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            const status = 422
            const responseBody: ValidationErrorResponse = {
                status,
                message: "Validation Failed",
                errors: validationErrors.array()
            }
            res.status(status).send(responseBody)
            return
        }

        next()
    }
}
