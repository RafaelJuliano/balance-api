import {
  AttributeValue,
  BatchWriteItemCommand,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb'
import { getClient } from '../../providers/dynamoDbProvider'
import type { AccountModel } from '../../model/Account'
import type { AccountsRepository } from '../repositories'

const TABLE_NAME = process.env.ACCOUNTS_TABLE_NAME

export const accountsRepository: AccountsRepository = {
  async create(account: AccountModel): Promise<void> {
    const client = getClient()

    const putCommand = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        id: { S: account.id },
        balance: {
          N: String(account.balance),
        },
      },
    })

    await client.send(putCommand)
  },
  async get(id: string): Promise<AccountModel> {
    const client = getClient()

    const getCommand = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    })

    const { Item } = await client.send(getCommand)

    if (Item) {
      return {
        id: Item.id.S,
        balance: Number(Item.balance.N),
      }
    }
  },
  async update(account: AccountModel): Promise<void> {
    const client = getClient()
    const updateCommand = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: account.id },
      },
      ExpressionAttributeNames: {
        '#B': 'balance',
      },
      ReturnValues: 'NONE',
      ExpressionAttributeValues: {
        ':b': { N: String(account.balance) },
      },
      UpdateExpression: 'set #B = :b',
    })

    await client.send(updateCommand)
  },
  async resetTable(): Promise<void> {
    const client = getClient()
    let lastEvaluatedKey: Record<string, AttributeValue>
    let batchOperations = []

    do {
      const scanResult = await client.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          Limit: 100,
          ExclusiveStartKey: lastEvaluatedKey,
        }),
      )

      for (const item of scanResult.Items || []) {
        batchOperations.push({
          DeleteRequest: {
            Key: {
              id: { S: item.id.S },
            },
          },
        })
      }

      if (batchOperations.length > 0) {
        await client.send(
          new BatchWriteItemCommand({
            RequestItems: {
              [TABLE_NAME]: batchOperations,
            },
          }),
        )
        batchOperations = []
      }

      lastEvaluatedKey = scanResult.LastEvaluatedKey
    } while (lastEvaluatedKey)
  },
}
