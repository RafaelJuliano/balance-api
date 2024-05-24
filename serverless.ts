import type { AWS } from '@serverless/typescript'
import functions from './src/handlers'
import { DynamoDb } from './infra'

const dynamoDb = new DynamoDb()

const serverlessConfiguration: AWS = {
  service: 'balance-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${opt:stage, "local"}',
    region: 'us-east-1',
    environment: {
      ENV: '${self:provider.stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [...dynamoDb.roles],
  },
  functions,
  resources: {
    Resources: { ...dynamoDb.databases },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['@aws-sdk/client-lambda', '@aws-sdk/client-dynamodb'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    'serverless-offline-ssm': {
      stages: ['local'],
    },
  },
}

module.exports = serverlessConfiguration
