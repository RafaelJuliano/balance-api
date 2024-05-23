import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { GetItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'

const handler = async (event: APIGatewayProxyEventV2) => {
  const client = new DynamoDBClient({})

  const command = new GetItemCommand({
    TableName: process.env.HEELO_TABLE_NAME,
    Key: {
      id: { S: '1' },
    },
  })

  const response = await client.send(command)

  if (!response) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  return {
    statusCode: 200,
    body: response?.Item?.name?.S,
  }
}

export const main = handler
