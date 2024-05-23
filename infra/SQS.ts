import { Resource } from './Resource'

export class SQS extends Resource {
  private _queues = {
    EventQueue: {
      Type: 'AWS::SQS::Queue',
      Properties: {
        MessageRetentionPeriod: 345600,
        QueueName: 'balances-${self:provider.stage}-events',
        VisibilityTimeout: 180,
      },
    },
  }

  public get queues() {
    return this._queues
  }

  public getQueueArn(queue: 'EventQueue') {
    return { 'Fn::GetAtt': [queue, 'Arn'] }
  }

  public getQueueUrl(queue: 'EventQueue') {
    return {
      'Fn::Join': [
        '',
        [
          `https://sqs`,
          '.',
          { Ref: 'AWS::Region' },
          '.amazonaws.com/',
          { Ref: 'AWS::AccountId' },
          '/',
          this.queues[queue].Properties.QueueName,
        ],
      ],
    }
  }

  public get roles() {
    return Object.values(this.queues).map(queue =>
      this.createRole('sqs', queue.Properties.QueueName, ['sqs:SendMessage']),
    )
  }
}
