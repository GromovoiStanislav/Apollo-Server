## Apollo-server (js) with Express, Mongoose

```
query Hello {
  hello
}

mutation CreateProject {
  createProject(name: "Project1", description: "description") {
    _id
    name
    description
    createdAt
    updatedAt
  }
}

mutation UpdateProject {
  updateProject(_id: "649a67b2ee8e0877d7fd1d0f", name: "Project 2") {
    name
    description
    createdAt
    updatedAt
  }
}

mutation CreateTask {
  createTask(title: "title1", projectId: "649a67b2ee8e0877d7fd1d0f") {
    _id
    title
    createdAt
  }
}

mutation UpdateTask {
  updateTask(
    _id: "649a6974ee8e0877d7fd1d22"
    title: "title 2"
    projectId: "649a67b2ee8e0877d7fd1d0f"
  ) {
    _id
    title
    createdAt
    updatedAt
  }
}

query Projects {
  projects {
    _id
    name
    description
    createdAt
    updatedAt
    tasks {
      _id
      title
    }
  }
}

query Project {
  project(_id: "649a67b2ee8e0877d7fd1d0f") {
    _id
    name
    description
    createdAt
    updatedAt
    tasks {
      _id
      title
    }
  }
}

query Tasks {
  tasks {
    _id
    title
    createdAt
    updatedAt
    project {
      _id
      name
    }
  }
}

query Task {
  task(_id: "649a6970ee8e0877d7fd1d1f") {
    _id
    title
    createdAt
    updatedAt
    project {
      _id
      name
    }
  }
}

mutation DeleteTask {
  deleteTask(_id: "649a6970ee8e0877d7fd1d1f") {
    _id
    title
    createdAt
    updatedAt
    project {
      _id
      name
    }
  }
}

mutation DeleteProject {
  deleteProject(_id: "649a67b2ee8e0877d7fd1d0f") {
    _id
    name
    description
  }
}
```
