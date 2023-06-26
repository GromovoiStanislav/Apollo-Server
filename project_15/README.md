## Apollo-server (js) with Express, Mongoose

```
query Hello {
  hello
}

mutation Mutation {
  createTask(task: { title: "title1", description: "description1" }) {
    id
    title
    description
  }
}

mutation UpdateTask {
  updateTask(id: "64996f4bd5188658769263e8", task: { title: "Title 1" }) {
    id
    title
    description
  }
}

mutation DeleteTask {
  deleteTask(id: "64996f62d5188658769263ec")
}

query GetAllTasks {
  getAllTasks {
    id
    title
    description
  }
}

query GetTask {
  getTask(id: "64996f4bd5188658769263e8") {
    id
    title
    description
  }
}
```
