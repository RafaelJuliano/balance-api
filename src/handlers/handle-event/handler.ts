import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { httpMidiffy, Response } from '@jftecnologia/lambda-utils'

const handler = async (event: APIGatewayProxyEventV2) => {
  const client = new SQSClient({})
  const sqsQueueUrl = process.env.SQS_QUEUE_URL
  const command = new SendMessageCommand({
    QueueUrl: sqsQueueUrl,
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: 'String',
        StringValue: 'Hello World',
      },
    },
    MessageBody: (event.body as unknown as { message: string }).message,
  })

  await client.send(command)
  Response.ok()
}

export const main = httpMidiffy(handler)
