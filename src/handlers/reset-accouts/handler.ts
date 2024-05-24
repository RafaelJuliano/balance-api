import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { handleUnknowErrors, simpleMidiffy } from '@jftecnologia/lambda-utils'
import { execute } from '../../useCases/resetAccountsUseCase'

const handler = async (_event: APIGatewayProxyEventV2) => {
  await execute()
  return {
    statusCode: 200,
    body: 'OK',
  }
}

export const main = simpleMidiffy(handler).use(handleUnknowErrors())
