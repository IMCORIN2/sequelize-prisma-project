export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }
  getUser = async (req, res, next) => {
    try {
      console.log(res.locals.user);

      const { userId } = res.locals.user;
      const userInfo = await this.usersService.findUserById(userId);
      console.log('last userInfo', userInfo);
      console.log(userInfo.success);
      console.log('userInfo.userId', userInfo.userId);
      if (userInfo.success === false) {
        console.log('1');
        res.status(404).json(userInfo);
      } else if (userInfo.userId) {
        console.log('2');
        return res.status(200).json({
          success: true,
          message: '내 정보 조회에 성공했습니다.',
          data: userInfo,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
