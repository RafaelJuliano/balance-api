import { yup } from '@jftecnologia/lambda-utils'

export const getBalanceSchema = yup
  .object()
  .shape({
    account_id: yup.string().matches(/^\d+$/, '${path} must contain only numeric digits'),
  })
  .noUnknown()
  .required()
