## Apollo-server (js) subscriptions with Express

```
npm i @apollo/server
npm i graphql
npm i @graphql-tools/schema
npm i graphql-subscriptions
npm i graphql-ws
npm i ws
npm i express
```

```
subscription Subscription {
  operationFinished {
    name
    endDate
  }
}

mutation ScheduleOperation {
  scheduleOperation(name: "Hello!!")
}
```