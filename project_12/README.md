## Apollo-server (js) with graphql-tag (+Authentication JWT)

```
mutation CreateUser {
  signup(
    input: {
      fname: "Tom"
      lname: "Brown"
      email: "tom@mail.com"
      password: "123"
    }
  ) {
    _id
    email
    fname
    lname
    createdAt
    updatedAt
    userJwtToken {
      token
    }
  }
}


mutation Login {
  login(input: { password: "123", email: "tom@mail.com" }) {
    userJwtToken {
      token
    }
  }
}


in HEADERS section:
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}

query GetUsers {
  getUsers(total: 10) {
    _id
    email
    fname
    lname
    password
    createdAt
    updatedAt
  }
}

query GetUser {
  getUserById(id: "6499251105f88022f72cbaaf") {
    _id
    email
    lname
    fname
    password
    following
    createdAt
    updatedAt
  }
}


mutation CreateRecipe {
  createRecipe(recipeInput: { name: "recipe1", description: "description" }) {
    id
    name
    description
    thumbsDown
    thumbsUp
    createdAt
  }
}

mutation EditRecipe {
  editRecipe(
    id: "6499345c8c0007ad42412b12"
    recipeInput: { name: "Recipe 1", description: "description 1" }
  ) {
    message
    isSuccess
  }
}

mutation IncrementThumbsUp {
  incrementThumbsUp(id: "6499345c8c0007ad42412b12") {
    message
    isSuccess
  }
}

mutation IncrementThumbsDown {
  incrementThumbsDown(id: "6499345c8c0007ad42412b12") {
    message
    isSuccess
  }
}

mutation DeleteRecipe {
  deleteRecipe(id: "649934508c0007ad42412b10") {
    isSuccess
    message
  }
}

query GetRecipes {
  getRecipes {
    id
    name
    description
    thumbsDown
    thumbsUp
    createdAt
  }
}

query GetRecipe {
  recipe(id: "6499345c8c0007ad42412b12") {
    id
    name
    description
    thumbsDown
    thumbsUp
    createdAt
  }
}
```
