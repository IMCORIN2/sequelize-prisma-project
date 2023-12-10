export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  findUserById = async (userId) => {
    try {
      const userInfo = await this.usersRepository.findUserById(userId);

      if (!userInfo) {
        throw new Error('등록된 유저가 없습니다.');
      }
      return {
        userId: userInfo.userId,
        email: userInfo.email,
        name: userInfo.name,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      };
    } catch (err) {
      next(err);
    }
  };
}
