import { NextFunction, Request, Response } from "express"
import { isHttpError } from "http-errors"

export interface ErrorResponse {
    status: number
    message: string
}

export function errorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    const status = isHttpError(err) ? err.status : 500
    const message = isHttpError(err) ? err.message : "Internal Server Error"
    if (!isHttpError(err)) {
        console.log(err)
    }

    const responseBody: ErrorResponse = { status, message }
    res.status(status).json(responseBody)
}
