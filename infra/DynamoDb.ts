import { Resource } from './Resource'

export class DynamoDb extends Resource {
  private _databases = {
    AccountsTable: {
      Type: 'AWS::DynamoDB::Table',
      Properties: {
        TableName: 'balances-${self:provider.stage}-accounts-table',
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    },
  }

  public get databases() {
    return this._databases
  }

  public get roles() {
    return Object.values(this._databases).map(database =>
      this.createRole('dynamodb', `table/${database.Properties.TableName}`, [
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:Scan',
        'dynamodb:DeleteItem',
        'dynamodb:BatchWriteItem',
      ]),
    )
  }
}
