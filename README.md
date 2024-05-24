# Balance API
This API was developed solely for the purpose of a technical test. It simulates monetary transactions between accounts.

# CI/CD
The application features automated deployments powered by [GitHub Actions](https://docs.github.com/pt/actions) and the [Serverless Framework](https://www.serverless.com/). This automation affects two environments, `dev` and `prod`, and is triggered whenever a push is made to the `develop` and `main` branches, respectively.

Each envinroment is provided by the following APIs:

Prod: https://gmz6hefoxh.execute-api.us-east-1.amazonaws.com

Dev: https://q94vlb5w8j.execute-api.us-east-1.amazonaws.com

# Architecture

The application leverages AWS architecture, incorporating Lambda functions for serverless computing, DynamoDB for scalable NoSQL database storage, enabling seamless API provision.

![Balance API](https://github.com/RafaelJuliano/balance-api/assets/67478757/efa04588-c3e8-47dd-988c-fb664d30f9d8)


# How to Test During Development

The application allows for local execution of Lambda functions, though a real DynamoDB instance is still required. To set up a test environment, follow the steps below (Node.js 18 is required).

Install the packages:
```bash
npm install
```

Install Serverless globally:
```bash
npm run -g serverless
```

Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Configure your AWS credentials:
```bash
aws configure
```

Deploy your test environment:
```bash
sls deploy --stage=test
```

Once the `test` environment is set up, you will have access to the AWS API Gateway and can execute the Lambda functions locally with the command:
```bash
npm start
```

# API Documentation

## URL: `/events`

### Description
Send event with account balance operantions such as `deposit`, `withdraw`, or `transfer`.

### Method: POST

### Request Body

- **type**: `string`
  - Description: Type of transaction. Must be one of the following values: `deposit`, `withdraw`, or `transfer`.
  - Required: Yes
- **destination**: `string`
  - Description: ID of the destination account. Must contain only numbers. For `deposit` operations, a new account number is accepted.
  - Required: For `deposit` and `transfer`
- **origin**: `string`
  - Description: ID of the origin account. Must contain only numbers.
  - Required: For `withdraw` and `transfer`
- **amount**: `number`
  - Description: Amount to be deposit/withdraw. Use integer values where $1.50 is represented by 150.
  - Required: Yes

### Responses

- **201 Created**
  - Description: Successful operation.
  - Body: 
    ```json
    {
      "origin": { "id": "string", "balance": "number" },
      "destination": { "id": "string", "balance": "number" }
    }
    ```
  - Notes: The `origin` field is included for `withdraw` and `transfer` operations. The `destination` field is included for `deposit` and `transfer` operations.

- **404 Not Found**
  - Description: The specified account was not found.
  - Body: 
    ```json
    0
    ```

## URL: `/balance`

### Description
Get Account current balance

### Method: GET

### Query Parameters

- **account_id**: `string`
  - Description: ID of the account.
  - Required: Yes

### Responses

- **200 OK**
  - Description: Successful retrieval of the account balance.
  - Body: 
    ```
    number
    ```

- **404 Not Found**
  - Description: The specified account was not found.
  - Body: 
    ```json
    0
    ```

## URL: `/reset`

### Method: POST

### Description

Delete all existing accounts.

### Responses

- **200 OK**
  - Description: All accounts have been successfully deleted.
  - Body: 
    ```
    'OK'
    ```
