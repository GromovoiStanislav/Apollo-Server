import Dataloader from "dataloader";
import { prisma } from "../index.js";
const batchUsers = async (ids) => {
    console.log(ids);
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    const userMap = {};
    users.forEach((user) => {
        userMap[user.id] = user;
    });
    return ids.map((id) => userMap[id]);
};
//@ts-ignore
export const userLoader = new Dataloader(batchUsers);
