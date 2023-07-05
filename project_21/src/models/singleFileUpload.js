import {Schema, model} from "mongoose";

const singleFile = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("SingleFile", singleFile);
