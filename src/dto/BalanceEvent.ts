import type { AccountModel } from '../model/Account'

export enum BalanceEventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export type BalanceEventDTO = {
  type: BalanceEventType
  destination: string
  origin: string
  amount: number
}

export type DepositBalanceEventDTO = Omit<BalanceEventDTO, 'type' | 'origin'>
export type DepositBalanceResponseDTO = { destination: AccountModel }

export type WithdrawBalanceEventDTO = Omit<BalanceEventDTO, 'type' | 'destination'>
export type WithdrawBalanceResponseDTO = { origin: AccountModel }

export type TransferBalanceEventDTO = Omit<BalanceEventDTO, 'type'>
export type TransferBalanceResponseDTO = {
  origin: AccountModel
  destination: AccountModel
}
