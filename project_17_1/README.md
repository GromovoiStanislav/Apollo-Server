## Apollo-server (ts) with Express, Prisma

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
      authorId: "d7288373-c6a3-485e-8446-a89601bb4c98"
    }
  ) {
    id
    title
    content
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
      authorId
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
    }
  }
}

query Post {
  post(id: "1bf8d126-6d8d-4360-8dd5-1069d96befbf") {
    id
    title
    content
    author {
      id
      username
      email
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
