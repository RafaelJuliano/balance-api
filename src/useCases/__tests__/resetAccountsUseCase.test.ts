import { mocked } from 'jest-mock'
import { accountsRepository } from '../../repositories'
import { execute } from '../resetAccountsUseCase'


jest.mock('../../repositories')

describe('Transfer Use Case', () => {
    const mockedResetTableAccount = mocked(accountsRepository.resetTable)

    it('should reset the table', async ( ) => {
        await execute()
        expect(mockedResetTableAccount).toBeCalledTimes(1)
    })
})