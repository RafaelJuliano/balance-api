import { NotFoundException } from '@jftecnologia/lambda-utils'
import { accountsRepository } from '../repositories'

export const execute = async (id: string): Promise<number> => {
  const account = await accountsRepository.get(id)

  if (!account) {
    throw new NotFoundException()
  }

  return account.balance
}
