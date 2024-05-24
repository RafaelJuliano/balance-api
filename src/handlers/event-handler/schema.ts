import { yup } from '@jftecnologia/lambda-utils'
import { BalanceEventType } from '../../dto/BalanceEvent'

export const balanceEventSchema = yup
  .object()
  .shape({
    type: yup
      .string()
      .oneOf(
        Object.values(BalanceEventType),
        `${'${path}'} should contain only the following values: ${Object.values(
          BalanceEventType,
        ).join(', ')}`,
      )
      .required(),
    destination: yup
      .string()
      .matches(/^\d+$/, '${path} must contain only numeric digits')
      .test({
        name: 'destination-required',
        message: `\${path} is a required field when type is '${BalanceEventType.DEPOSIT}'`,
        test: (value: string, ctx): boolean => {
          if (!value && ctx.parent.type === BalanceEventType.DEPOSIT) {
            return false
          }
          return true
        },
      }),
    origin: yup
      .string()
      .matches(/^\d+$/, '${path} must contain only numeric digits')
      .test({
        name: 'origin-required',
        message: `\${path} is a required field when type is '${BalanceEventType.WITHDRAW}'`,
        test: (value: string, ctx): boolean => {
          if (!value && ctx.parent.type === BalanceEventType.WITHDRAW) {
            return false
          }
          return true
        },
      }),
    amount: yup.number().integer('${path} must be an integer').required(),
  })
  .noUnknown()
  .required()
