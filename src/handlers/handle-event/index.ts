import { SQS } from '../../../infra'
import { handlerPath } from '../../utils/handler-resolver'

const sqs = new SQS()
const queueUrl = sqs.getQueueUrl('EventQueue')

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  environment: {
    SQS_QUEUE_URL: queueUrl,
  },
  events: [
    {
      httpApi: {
        path: '/hello-world',
        method: 'POST',
      },
    },
  ],
}
