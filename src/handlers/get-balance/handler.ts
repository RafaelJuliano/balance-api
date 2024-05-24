import { APIGatewayProxyEventV2 } from 'aws-lambda'
import {
  NotFoundException,
  Response,
  handleUnknowErrors,
  simpleMidiffy,
  validateQueryStringParameters,
} from '@jftecnologia/lambda-utils'
import { execute } from '../../useCases/getBalanceUseCase'
import { getBalanceSchema } from './schema'

const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const { account_id } = getBalanceSchema.cast(event.queryStringParameters || {})
    const balance = await execute(account_id)
    return Response.success(JSON.parse(String(balance)))
  } catch (error) {
    if (error instanceof NotFoundException) {
      return {
        statusCode: 404,
        body: 0,
      }
    }
    throw error
  }
}

export const main = simpleMidiffy(handler)
  .use(handleUnknowErrors())
  .use(validateQueryStringParameters(getBalanceSchema))
