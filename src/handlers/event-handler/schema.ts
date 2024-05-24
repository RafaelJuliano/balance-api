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
      .required(),
    amount: yup.number().integer('${path} must be an integer').required(),
  })
  .noUnknown()
  .required()
