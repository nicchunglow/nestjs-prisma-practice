import { UnprocessableEntityException } from '@nestjs/common'
import { userSchema } from './user.schema'

describe('User Schema Validation', () => {
  it('should validate a valid user', () => {
    const validUserData = {
      name: 'TestUser',
      email: 'test@email.gov',
      agency: 'ACRA',
      description: 'I am a test officer',
      acceptTerms: true,
    }

    expect(userSchema.validateAsync(validUserData)).toBeTruthy()
  })

  it('should throw UnprocessableEntityException for invalid name', () => {
    const invalidUserData = {
      name: '12',
      email: 'john.doe@gov',
      agency: 'ACRA',
      description: 'Lorem ipsum',
      acceptTerms: true,
    }

    expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      UnprocessableEntityException
    )
  })
  it('should throw UnprocessableEntityException for invalid email', async () => {
    const invalidUserData = {
      name: 'John',
      email: 'john.doe@gov.sg',
      agency: 'ACRA',
      description: 'Lorem ipsum',
      acceptTerms: true,
    }

    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      UnprocessableEntityException
    )
    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      'Contact Email should be a valid .gov email format'
    )
  })
  it('should throw UnprocessableEntityException for invalid agency', async () => {
    const invalidUserData = {
      name: 'John',
      email: 'john.doe@email.gov',
      agency: 'ACRAa',
      description: 'Lorem ipsum',
      acceptTerms: true,
    }

    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      UnprocessableEntityException
    )
    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      'Invalid agency selection'
    )
  })
  it('should throw UnprocessableEntityException for invalid description', async () => {
    const invalidUserData = {
      name: 'John',
      email: 'john.doe@email.gov',
      agency: 'ACRA',
      description: '',
      acceptTerms: true,
    }

    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      UnprocessableEntityException
    )
    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      'Description should not exceed 500 characters and cannot be empty'
    )
  })
  it('should throw UnprocessableEntityException for invalid acceptTerms', async () => {
    const invalidUserData = {
      name: 'John',
      email: 'john.doe@email.gov',
      agency: 'ACRA',
      description: 'asdasd',
      acceptTerms: false,
    }

    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      UnprocessableEntityException
    )
    await expect(userSchema.validateAsync(invalidUserData)).rejects.toThrow(
      'You must accept the terms of use'
    )
  })
})
