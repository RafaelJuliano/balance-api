import { NotFoundException } from '@jftecnologia/lambda-utils'
import type {
  WithdrawBalanceEventDTO,
  WithdrawBalanceResponseDTO,
} from '../dto/BalanceEvent'
import { accountsRepository } from '../repositories'

export const execute = async (
  withdrawEvent: WithdrawBalanceEventDTO,
): Promise<WithdrawBalanceResponseDTO> => {
  const { origin, amount } = withdrawEvent

  const existingAccount = await accountsRepository.get(origin)

  if (!existingAccount) {
    throw new NotFoundException()
  } else {
    const account = { ...existingAccount, balance: existingAccount.balance - amount }
    await accountsRepository.update(account)
    return { origin: account }
  }
}
