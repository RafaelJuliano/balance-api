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
        message: `\${path} is a required field when type is '${BalanceEventType.DEPOSIT}' or '${BalanceEventType.TRANSFER}'`,
        test: (value: string, ctx): boolean => {
          const isRequired =
            ctx.parent.type === BalanceEventType.DEPOSIT ||
            ctx.parent.type === BalanceEventType.TRANSFER
          if (!value && isRequired) {
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
        message: `\${path} is a required field when type is '${BalanceEventType.WITHDRAW}' or '${BalanceEventType.TRANSFER}'`,
        test: (value: string, ctx): boolean => {
          const isRequired =
            ctx.parent.type === BalanceEventType.WITHDRAW ||
            ctx.parent.type === BalanceEventType.TRANSFER
          if (!value && isRequired) {
            return false
          }
          return true
        },
      }),
    amount: yup.number().integer('${path} must be an integer').min(1).required(),
  })
  .noUnknown()
  .required()
