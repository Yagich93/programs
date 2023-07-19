import { injectable } from "inversify"
import { BaseMiddleware } from "inversify-express-utils"
import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"

@injectable()
export class ValidatorMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction): void {
        const validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            res.status(422).send({ errors: validationErrors.array() })
            return
        }

        next()
    }
}
