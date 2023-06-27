import Project from "../models/Project.js";
import Task from "../models/Task.js";
import {getSesson} from "../db.js";

export const resolvers = {
    Query: {
        hello: () => "Hello world!",

        projects: async () => {
            return await Project.find();
        },

        project: async (_, {_id}) => {
            return await Project.findById(_id);
        },

        tasks: async () => {
            return await Task.find();
        },

        task: async (_, {_id}) => {
            return await Task.findById(_id);
        },
    },
    Mutation: {

        createProject: async (_, {name, description}) => {
            const project = new Project({
                name,
                description,
            });
            return project.save();
        },

        deleteProject: async (_, {_id}) => {
            await Task.deleteMany({projectId: _id});
            const deletedProject = await Project.findByIdAndDelete(_id);
            if (!deletedProject) throw new Error("Project not found");
            return deletedProject;


            // let deletedProject = null;
            // const projectFound = await Project.findById(_id);
            // if (!projectFound) {
            //     throw new Error("Project not found");
            // }
            // const session = await getSesson();
            // const session = await Project.startSession();
            // session.startTransaction();
            // try {
            //     await Task.deleteMany({projectId: _id}).session(session);
            //     deletedProject = await Project.findByIdAndDelete(_id).session(session);
            //     await session.commitTransaction();
            // } catch (error) {
            //     console.log(error)
            //     await session.abortTransaction();
            //     throw new Error("Transaction error");
            // } finally {
            //     session.endSession();
            // }
            // return deletedProject;
        },

        updateProject: async (_, args) => {
            const updatedProject = await Project.findByIdAndUpdate(
                args._id,
                args,
                {new: true}
            );
            if (!updatedProject) throw new Error("Project not found");
            return updatedProject;
        },

        createTask: async (_, {title, projectId}) => {
            const projectFound = await Project.findById(projectId);
            if (!projectFound) {
                throw new Error("Project not found");
            }

            const task = new Task({
                title,
                projectId,
            });
            return task.save();
        },

        deleteTask: async (_, {_id}) => {
            const deletedTask = await Task.findByIdAndDelete(_id);
            if (!deletedTask) throw new Error("Task not found");
            return deletedTask;
        },

        updateTask: async (_, args) => {
            const projectFound = await Project.findById(args.projectId);
            if (!projectFound) {
                throw new Error("Project not found");
            }

            const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true,
            });
            if (!updatedTask) throw new Error("Task not found");
            return updatedTask;
        }
    },
    Project: {
        tasks: async (parent) => {
            return Task.find({projectId: parent._id});
        }
    },
    Task: {
        project: async (parent) => {
            return Project.findById(parent.projectId);
        }
    }
};
