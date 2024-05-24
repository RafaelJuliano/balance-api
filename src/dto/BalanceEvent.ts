import type { AccountModel } from '../model/Account'

export enum BalanceEventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export type BalanceEventDTO = {
  type: BalanceEventType
  destination: string
  origin: string
  amount: number
}

export type DepositBalanceEventDTO = Omit<BalanceEventDTO, 'type' | 'origin'> & {
  type: BalanceEventType.DEPOSIT
}
export type DepositBalanceResponseDTO = { destination: AccountModel }

export type WithdrawBalanceEventDTO = Omit<BalanceEventDTO, 'type' | 'destination'> & {
  type: BalanceEventType.WITHDRAW
}
export type WithdrawBalanceResponseDTO = { origin: AccountModel }
