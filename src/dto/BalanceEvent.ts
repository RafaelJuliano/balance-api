import type { AccountModel } from '../model/Account'

export enum BalanceEventType {
  DEPOSIT = 'deposit',
}

export type BalanceEventDTO = {
  type: BalanceEventType
  destination: string
  amount: number
}

export type DepositBalanceEventDTO = Omit<BalanceEventDTO, 'type'> & {
  type: BalanceEventType.DEPOSIT
}
export type DepositBalanceResponseDTO = { destination: AccountModel }
