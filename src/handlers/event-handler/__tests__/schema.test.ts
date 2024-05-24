import { yupValidate } from '@jftecnologia/lambda-utils'
import { balanceEventSchema } from '../schema'
import { BalanceEventType } from '../../../dto/BalanceEvent'

describe('Schema - CreateAccountPayableSchema', () => {
  const createValidDto = () => ({
    type: BalanceEventType.DEPOSIT,
    destination: '100',
    amount: 10,
  })
  const validate = (object: object, errors?: string[]) => {
    try {
      yupValidate(balanceEventSchema, object)
      return true
    } catch (error) {
      if (!errors) {
        return false
      }
      expect(error.errors).toStrictEqual(errors)
    }
  }
  it('should validate body', () => {
    expect(validate(createValidDto())).toBeTruthy()
  })

  it.each(['type', 'destination', 'amount'])('should validate required fields', value => {
    const dto = createValidDto()
    delete dto[value]

    validate(dto, [`${value} is a required field`])
  })

  it.each([
    {
      value: 'abc',
      error: 'amount must be a `number` type, but the final value was: `"abc"`.',
    },
    {
      value: 1.5,
      error: 'amount must be an integer',
    },
  ])('should validate amount', ({ value, error }) => {
    const dto = createValidDto()
    //@ts-ignore
    dto.amount = value

    validate(dto, [error])
  })

  it('should validate type', () => {
    const dto = createValidDto()
    //@ts-ignore
    dto.type = 'invalid'

    validate(dto, [
      `type should contain only the following values: ${Object.values(
        BalanceEventType,
      ).join(', ')}`,
    ])
  })

  it.each([
    {
      value: 'abc',
      error: 'destination must contain only numeric digits',
    },
    {
      value: 15,
      error: 'destination must be a `string` type, but the final value was: `15`.',
    },
  ])('should validate destination', ({ value, error }) => {
    const dto = createValidDto()
    //@ts-ignore
    dto.destination = value

    validate(dto, [error])
  })
})
