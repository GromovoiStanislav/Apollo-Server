export const Query = {
    me: (_, __, { userInfo, prisma }) => {
        if (!userInfo)
            return null;
        return prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
    },
    profile: async (_, { userId }, { prisma, userInfo }) => {
        const isMyProfile = Number(userId) === userInfo?.userId;
        const profile = await prisma.profile.findUnique({
            where: {
                userId: Number(userId),
            },
        });
        if (!profile)
            return null;
        return {
            ...profile,
            isMyProfile,
        };
    },
    posts: (_, __, { prisma }) => {
        return prisma.post.findMany({
            where: {
                published: true,
            },
            orderBy: [
                {
                    createdAt: "desc",
                },
            ],
        });
    },
};
