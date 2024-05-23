import { DynamoDb, SQS } from '../../../infra'
import { handlerPath } from '../../utils/handler-resolver'

const dynamoDb = new DynamoDb()
const sqs = new SQS()

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    HEELO_TABLE_NAME: dynamoDb.databases.helloTable.Properties.TableName,
  },
  events: [
    {
      sqs: {
        arn: sqs.getQueueArn('EventQueue'),
        batchSize: 10,
        maximumBatchingWindow: 60,
      },
    },
  ],
}
