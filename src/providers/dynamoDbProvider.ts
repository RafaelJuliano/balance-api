import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

let dynamoClient: DynamoDBClient

export const getClient = () => {
  if (!dynamoClient) {
    dynamoClient = new DynamoDBClient()
  }
  return dynamoClient
}
