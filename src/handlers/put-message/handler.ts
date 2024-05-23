import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { httpMidiffy, Response } from '@jftecnologia/lambda-utils'

const handler = async (event: APIGatewayProxyEventV2) => {
  const client = new DynamoDBClient({})

  const id = new Date().getTime().toString()

  const command = new PutItemCommand({
    TableName: process.env.HEELO_TABLE_NAME,
    Item: {
      id: {
        S: id,
      },
      message: {
        S: (event.body as unknown as { message: string }).message,
      },
    },
  })

  await client.send(command)

  return Response.success({ id })
}

export const main = httpMidiffy(handler)
