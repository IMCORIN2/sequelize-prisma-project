export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  findUserById = async (userId) => {
    try {
      const user = await this.prisma.users.findFirst({ where: { userId } });

      return user;
    } catch (err) {
      next(err);
    }
  };
}
