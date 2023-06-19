## Apollo-server (js) union


```
mutation Mutation {
  register {
    ... on TimeoutError {
      seconds
      reason
    }
    ... on ValidationError {
      msg
      field
    }
  }
}
```