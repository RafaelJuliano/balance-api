import { yupValidate } from '@jftecnologia/lambda-utils'
import { balanceEventSchema } from '../schema'
import { BalanceEventType } from '../../../dto/BalanceEvent'

describe('Schema - CreateAccountPayableSchema', () => {
  const createDepositDto = () => ({
    type: BalanceEventType.DEPOSIT,
    destination: '100',
    amount: 10,
  })

  const createWithdrawDto = () => ({
    type: BalanceEventType.WITHDRAW,
    destination: '100',
    amount: 10,
  })

  const createTransferDto = () => ({
    type: BalanceEventType.WITHDRAW,
    destination: '100',
    origin: '200',
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
    expect(validate(createDepositDto())).toBeTruthy()
  })

  it.each(['type', 'amount'])('should validate required fields', value => {
    const dto = createDepositDto()
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
    {
      value: -1,
      error: 'amount must be greater than or equal to 1',
    },
    {
      value: 0,
      error: 'amount must be greater than or equal to 1',
    },
  ])('should validate amount', ({ value, error }) => {
    const dto = createDepositDto()
    //@ts-ignore
    dto.amount = value

    validate(dto, [error])
  })

  it('should validate type', () => {
    const dto = createDepositDto()
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
    {
      value: undefined,
      error: "destination is a required field when type is 'deposit' or 'transfer'",
    },
  ])('should validate destination', ({ value, error }) => {
    const dto = createDepositDto()
    //@ts-ignore
    dto.destination = value

    validate(dto, [error])
  })

  it.each([
    {
      value: 'abc',
      error: 'origin must contain only numeric digits',
    },
    {
      value: 15,
      error: 'origin must be a `string` type, but the final value was: `15`.',
    },
    {
      value: undefined,
      error: "origin is a required field when type is 'withdraw' or 'transfer'",
    },
  ])('should validate origin', ({ value, error }) => {
    const dto = createWithdrawDto()
    //@ts-ignore
    dto.origin = value

    validate(dto, [error])
  })

  it.each(['origin', 'destination'])('should validate origin and destination', key => {
    const dto = createTransferDto()
    //@ts-ignore
    delete dto[key]

    validate(dto, [
      `${key} is a required field when type is '${
        key === 'origin' ? 'withdraw' : 'deposit'
      }' or 'transfer'`,
    ])
  })
})
