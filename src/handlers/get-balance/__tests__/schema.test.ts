import { yupValidate } from '@jftecnologia/lambda-utils'
import { getBalanceSchema } from '../schema'

describe('Schema - CreateAccountPayableSchema', () => {
  const createValidDto = () => ({
    account_id: '100'
  })

  const validate = (object: object, errors?: string[]) => {
    try {
      yupValidate(getBalanceSchema, object)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }
  it('should validate query', () => {
    expect(validate(createValidDto())).toBeTruthy()
  })


  it.each([
    {
      value: 'abc',
      error: 'account_id must contain only numeric digits',
    },
    {
      value: 15,
      error: 'account_id must be a `string` type, but the final value was: `15`.',
    },
  ])('should validate account_id', ({ value, error }) => {
    const dto = createValidDto()
    //@ts-ignore
    dto.account_id = value

    validate(dto, [error])
  })

})
