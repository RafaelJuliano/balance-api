import { DynamoDb } from '../../../infra'
import { handlerPath } from '../../utils/handler-resolver'

const dynamoDb = new DynamoDb()

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    ACCOUNTS_TABLE_NAME: dynamoDb.databases.AccountsTable.Properties.TableName,
  },
  events: [
    {
      httpApi: {
        path: '/reset',
        method: 'POST',
      },
    },
  ],
}
