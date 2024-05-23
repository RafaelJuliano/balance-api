import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { GetItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { httpMidiffy, Response, NotFoundException } from '@jftecnologia/lambda-utils'

const handler = async (event: APIGatewayProxyEventV2) => {
  const client = new DynamoDBClient({})

  const command = new GetItemCommand({
    TableName: process.env.HEELO_TABLE_NAME,
    Key: {
      id: { S: event.queryStringParameters.id },
    },
  })

  const response = await client.send(command)

  if (!response) {
    throw new NotFoundException()
  }

  return Response.success({ message: response?.Item?.message?.S })
}

export const main = httpMidiffy(handler)
