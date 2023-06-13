export const Profile = {
    user: (parent, __, { userInfo, prisma }) => {
        return prisma.user.findUnique({
            where: {
                id: parent.userId,
            },
        });
    },
};
