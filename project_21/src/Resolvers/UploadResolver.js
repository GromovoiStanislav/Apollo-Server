import {readFile, multipleFileUploads} from "../libs/uploadFile.js";
import SingleFileUpload from "../models/singleFileUpload.js";
import MultipleUpload from "../models/multipleFileUpload.js";

export const resolvers = {
    // Query: {
    //     greetings: () => "",
    // },
    Mutation: {

        async singleUpload(_, {file}) {
            const imageUrl = await readFile(file);
            const singleFile = new SingleFileUpload({image: imageUrl});
            await singleFile.save();

            return {
                imageUrl,
            };
        },

        async multipleUpload(_, {file}) {
            const imageUrls = await multipleFileUploads(file);
            const multipleFile = new MultipleUpload();
            multipleFile.images.push(...imageUrls);
            await multipleFile.save();

            return {
                message: "Multiple file was uploaded",
                imageUrls
            };
        },

        async singleUploadWithData(_, {file, title}) {
            const imageUrl = await readFile(file);
            const singleFile = new SingleFileUpload({image: imageUrl});
            await singleFile.save();

            return {
                title: title.toUpperCase(),
                imageUrl,
            };
        },
    },
};

