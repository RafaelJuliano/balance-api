import { APIGatewayProxyEventV2 } from 'aws-lambda'

const handler = async (event: APIGatewayProxyEventV2) => {
  return {
    statusCode: 200,
    body: 'Hello World from lambda!',
  }
}

export const main = handler
