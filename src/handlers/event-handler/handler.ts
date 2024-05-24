import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { httpMidiffy, Response, validateBody } from '@jftecnologia/lambda-utils'
import { execute as depositUseCase } from '../../useCases/depositUseCase'
import { balanceEventSchema } from './schema'
import { BalanceEventType, DepositBalanceEventDTO } from '../../dto/BalanceEvent'

const handler = async (event: APIGatewayProxyEventV2) => {
  const body = balanceEventSchema.cast(event.body || {})

  const eventHandlers = {
    [BalanceEventType.DEPOSIT]: depositUseCase,
  }

  const response = await eventHandlers[body.type](body as DepositBalanceEventDTO)

  return Response.success(response)
}

export const main = httpMidiffy(handler).use(validateBody(balanceEventSchema))
