## apollo-server (js) and @graphql-tools/schema with Express, Mongoose

```
npm i express
npm i @apollo/server
npm i @graphql-tools/schema
```

```
query AllCars {
  allCars {
    _id
    name
  }
}

mutation CreateCar {
  createCar(name: "BMW") {
    _id
    name
  }
}

in Headers:
Authorization: "Bearer token..."

query myToken {
  myToken
}
```
