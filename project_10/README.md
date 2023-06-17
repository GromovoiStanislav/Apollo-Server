## Apollo-server (js) with MongoDB, Authentication JWT, validator, Error Handling

```
query Query {
  users {
    id
    email
    username
  }
  user(id: "648d30bd432ad4629ddd977b") {
    id
    username
    email
  }
  me {
    id
    username
    email
  }
}

mutation Mutation {
  loginUser(loginInput: { password: "123", email: "tom@mail.ru" }) {
    token
  }
}

mutation Mutation {
  registerUser(
    registerInput: { username: "Tom", password: "123", email: "tom@mail.ru" }
  ) {
    id
    email
    token
    username
  }
}
```
