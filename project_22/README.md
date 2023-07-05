## Apollo-server (mjs) upload files with Express

```
npm i express
npm i @apollo/server
npm i graphql-upload
npm i graphql
```

```
query Uploads {
  uploads {
    id
    name
    url
  }
}


in Headers:
apollo-require-preflight: true

mutation SingleUpload($file: Upload!) {
  singleUpload(file: $file) {
    id
    name
    url
  }
}


mutation MultipleUpload($files: [Upload!]!) {
  multipleUpload(files: $files) {
    id
    name
    url
  }
}
```
