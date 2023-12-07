export class UsersController {
  getUser = async (req, res, next) => {
    try {
      const me = res.lacals.user;

      return res.status(200).json({
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: me,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  };
}
