import {Schema, model} from "mongoose";

const imageSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);


const multipleFileSchema = new Schema(
    {
        images: [imageSchema],
    },
    {

        timestamps: true,
    }
);

export default model("MultipleFile", multipleFileSchema);
