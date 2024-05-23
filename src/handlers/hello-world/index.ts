import { handlerPath } from '../../utils/handler-resolver'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 128,
  events: [
    {
      httpApi: {
        path: '/hello-world',
        method: 'GET',
      },
    },
  ],
}
