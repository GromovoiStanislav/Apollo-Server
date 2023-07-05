export const typeDefs = `#graphql
    scalar Upload
    
    type Mutation {
        singleUpload(file: Upload!): SingleResponse
        singleUploadWithData(file: Upload, title: String): DataResponse
        multipleUpload(file: [Upload]!): SuccessMessage
    }
    
    type SuccessMessage {
        message: String,
        imageUrls: [imageUrl]
    }
    
    type DataResponse {
        title: String,
        imageUrl: String
    }

    type SingleResponse {
        imageUrl: String
    }

    type imageUrl {
        url: String
    }
`;
