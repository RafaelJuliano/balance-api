import { SQSEvent } from 'aws-lambda'
import { PutItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { Response } from '@jftecnologia/lambda-utils'

const handler = async (event: SQSEvent) => {
  const client = new DynamoDBClient({})

  const id = new Date().getTime().toString()

  const command = new PutItemCommand({
    TableName: process.env.HEELO_TABLE_NAME,
    Item: {
      id: {
        S: id,
      },
      message: {
        S: event.Records[0].body,
      },
    },
  })

  await client.send(command)

  return Response.success({ id })
}

export const main = handler
