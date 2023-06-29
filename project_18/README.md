## Apollo-server (ts) with Express, Mongoose

```
mutation UploadSong {
  uploadSong(input: { name: "name", genre: "pop", author: "tom" }) {
    ...AllSongData
  }
}

query GetSongs {
  getSongs {
    ...AllSongData
  }
}

query GetSong {
  getSong(id: "649d5068094fa2e8622fd7c4") {
    ...AllSongData
  }
}

mutation DeleteSong {
  deleteSong(id: "649d5068094fa2e8622fd7c4") {
    ...AllSongData
  }
}

fragment AllSongData on Song {
  id
  name
  author
  genre
}
```
