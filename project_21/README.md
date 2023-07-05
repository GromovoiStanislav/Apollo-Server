## apollo-server (js) upload files with Express, Mongoose

```
npm i express
npm i @apollo/server
npm i graphql-upload
```

```
query Greetings {
  greetings(name: "Tom")
}


in Headers:
apollo-require-preflight: true


mutation SingleUpload($file: Upload!) {
  singleUpload(file: $file) {
    imageUrl
  }
}

mutation SingleUploadWithData($file: Upload) {
  singleUploadWithData(title: "Title", file: $file) {
    title
    imageUrl
  }
}

mutation MultipleUpload($file: [Upload]!) {
  multipleUpload(file: $file) {
    message
    imageUrls {
      url
    }
  }
}
```
