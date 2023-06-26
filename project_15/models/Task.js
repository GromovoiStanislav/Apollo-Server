import {Schema, model} from "mongoose"

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Task = model("Task", taskSchema);
export default Task;