## Apollo-server (ts) and type-graphql with Express, TypeORM

```
query Ping {
  ping
}

query Products {
  products {
    id
    name
    quantity
    createdAt
  }
}

query Product {
  product(id: 2) {
    id
    name
    quantity
    createdAt
  }
}

mutation CreateProduct {
  createProduct(variables: { quantity: 10, name: "Product 1" }) {
    id
    name
    quantity
    createdAt
  }
}

mutation UpdateProduct {
  updateProduct(fields: { quantity: 9 }, id: 1)
}

mutation DeleteProduct {
  deleteProduct(id: 3)
}
```
