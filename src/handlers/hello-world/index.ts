import { DynamoDb } from '../../../infra'
import { handlerPath } from '../../utils/handler-resolver'

const dynamoDb = new DynamoDb()

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    HEELO_TABLE_NAME: dynamoDb.databases.helloTable.Properties.TableName,
  },
  events: [
    {
      httpApi: {
        path: '/hello-world',
        method: 'GET',
      },
    },
  ],
}
