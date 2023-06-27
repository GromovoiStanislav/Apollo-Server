## Apollo-server (ts) with Express, Prisma (without GraphQLResolveInfo)

```
npm i prisma -D
npm i @prisma/client
npx prisma init
npx prisma migrate dev
npx prisma migrate dev --name init
```

```
mutation CreateUser {
  createUser(input: { username: "Tom", email: "tom@mail.com" }) {
    id
    username
    email
  }
}


mutation UpdateUser {
  updateUser(
    input: { id: "d7288373-c6a3-485e-8446-a89601bb4c98", username: "Tomi" }
  ) {
    username
    email
  }
}


mutation CreatePost {
  createPost(
    input: {
      title: "Title 1"
      content: "content"
      authorId: "f98f9c19-96ad-47f6-91a7-172d1b74af40"
    }
  ) {
    id
    title
    content
    author {
      id
      username
    }
  }
}

mutation UpdatePost {
  updatePost(input: {
    title: "Title 2",
    id: "a24ce1c9-76f8-4877-8375-b6321e7c62a8",
  }) {
    id
    title
    content
    authorId
    author {
      id
    }
  }
}

query Users {
  users {
    id
    username
    email
    posts {
      id
      title
      content
      author {
        id
      }
    }
  }
}

query User {
  user(id: "d7288373-c6a3-485e-8446-a89601bb4c98") {
    id
    username
    email
    posts {
      id
      title
      content
      authorId
    }
  }
}

query Posts {
  posts {
    id
    title
    content
    author {
      id
      username
      posts {
        id
      }
    }
  }
}

query Post {
  post(id: "828e7d41-6e8a-42d9-8d03-7b1d4b83d388") {
    id
    title
    content
    author {
      id
      username
      email
      posts {
        id
        title
      }
    }
  }
}

mutation DeletePost {
  deletePost(id: "a24ce1c9-76f8-4877-8375-b6321e7c62a8") {
    id
    title
    content
    authorId
  }
}

mutation DeleteUser {
  deleteUser(id: "1bf8d126-6d8d-4360-8dd5-1069d96befbf") {
    id
    username
    email
  }
}
```
