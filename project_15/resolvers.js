import Task from "./models/Task.js";

export const resolvers = {
    Query: {
        hello: () => "Hello world",

        getAllTasks: async () => {
            return Task.find();
        },

        getTask: async (_, {id}) => {
            return Task.findById(id);
        },
    },

    Mutation: {
        async createTask(parent, {task}, context, info) {
            const {title, description} = task;
            const newTask = new Task({title, description});
            await newTask.save();
            return newTask;
        },

        async deleteTask(_, {id}) {
            await Task.findByIdAndDelete(id);
            return "Task Deleted";
        },

        async updateTask(_, {id, task}) {
            const {title, description} = task;
            const newTask = await Task.findByIdAndUpdate(
                id,
                {
                    $set: {
                        title,
                        description,
                    },
                },
                {
                    new: true,
                }
            );
            return newTask;
        },
    },
};
