import {Schema, model} from "mongoose";

const carSchema = new Schema({
    name: String
});

export default model('Car', carSchema);

