import { body, checkExact, param } from "express-validator"

import { TYPES } from "../types"
import { LearningFormat } from "../models"

const PROGRAM_BODY_VALIDATORS = [
    body("title")
        .isString()
        .withMessage("Should be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage("Min 1, max 100 characters")
        .matches(/^[A-Za-z0-9-_ ]+$/)
        .withMessage("Allowed only letters, numbers, '-', '_', ' '"),

    body("topic")
        .isString()
        .withMessage("Should be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage("Min 1, max 100 characters")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Allowed only lowercase letters, numbers, '-'"),

    body("learningFormats").isArray({ min: 1 }).withMessage("Should be a non-empty array"),
    body("learningFormats[*]")
        .isIn(Object.values(LearningFormat))
        .withMessage(`Should be one of: ${Object.values(LearningFormat).join(", ")}`),

    body("bestseller").isBoolean({ strict: true }),

    body("startDate")
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("Should be ISO8601 Date"),

    checkExact()
]

const ID_PARAM_VALIDATOR = param("id")
    .isInt({ min: 0 })
    .withMessage("Should be non-negative integer")
    .toInt()

export const ADD_PROGRAM_VALIDATORS = [...PROGRAM_BODY_VALIDATORS, TYPES.ValidatorMiddleware]

export const DELETE_PROGRAM_VALIDATORS = [ID_PARAM_VALIDATOR, TYPES.ValidatorMiddleware]

export const UPDATE_PROGRAM_VALIDATORS = [
    ID_PARAM_VALIDATOR,
    ...PROGRAM_BODY_VALIDATORS,
    TYPES.ValidatorMiddleware
]
