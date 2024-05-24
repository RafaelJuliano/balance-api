import type { AccountModel } from '../model/Account'

export interface AccountsRepository {
  get(id: string): Promise<AccountModel | null>
  create(account: AccountModel): Promise<void>
  update(account: AccountModel): Promise<void>
  resetTable(): Promise<void>
}
