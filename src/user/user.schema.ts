import * as Joi from 'joi'
import { UnprocessableEntityException } from '@nestjs/common'
import * as agenciesList from '../constants/agencies.json'

const nameValidator = /^[a-zA-Z0-9 _-]*$/

export const userSchema = Joi.object({
  name: Joi.string()
    .required()
    .min(3)
    .max(30)
    .pattern(new RegExp(nameValidator))
    .error(new UnprocessableEntityException('name should be valid format')),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['gov'] },
    })
    .error(
      new UnprocessableEntityException(
        'Contact Email should be a valid .gov email format'
      )
    ),
  agency: Joi.string()
    .required()
    .valid(...agenciesList.agencies)
    .error(new UnprocessableEntityException('Invalid agency selection')),
  description: Joi.string()
    .required()
    .empty('')
    .max(500)
    .error(
      new UnprocessableEntityException(
        'Description should not exceed 500 characters and cannot be empty'
      )
    ),
  acceptTerms: Joi.boolean()
    .valid(true)
    .required()
    .error(
      new UnprocessableEntityException('You must accept the terms of use')
    ),
})
