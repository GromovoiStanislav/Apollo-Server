## Apollo-server (js) with MongoDB

```
query Query {
  message(id: "648c2a9b434061b898be41fd") {
    id
    text
    createdBy
    createdAt
  }
  messages {
    id
    text
    createdBy
    createdAt
  }
}

mutation Mutation {
  createMessage(messageInput: { username: "Tom", text: "text" }) {
    id
    text
    createdBy
    createdAt
  }
}
```
