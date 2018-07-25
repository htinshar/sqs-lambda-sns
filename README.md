## DESCRIPTION

- Lambda function to pull the message from sqs with schedule and push that message to SNS topic.

## Function

- First `lambda-invoker` function is to pull the message from sqs with schedule (for example, once in every hour or a minute) and pass this message to `worker` function.
- Second `worker` function purpose is to accept the message from `invoker` and push that message to SNS topic

## Config

-  Change `region`, `key`, `secrect` etc.. in `config/dev.yml` and update that information in `serverless.yml`

## Test before deploy

-  Run `npm test`