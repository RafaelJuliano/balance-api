# Balance API
API created for technical testing purposes.

# Architecture

The application leverages AWS architecture, incorporating Lambda functions for serverless computing, DynamoDB for scalable NoSQL database storage, and SQS for reliable message queuing, enabling seamless API provision.
The /event API leverages SQS queues to handle transactions sequentially, effectively sidestepping any potential concurrency issues.

![Balance API (1)](https://github.com/RafaelJuliano/balance-api/assets/67478757/b289dd32-4ce4-4545-b258-a8ca92e8c894)
