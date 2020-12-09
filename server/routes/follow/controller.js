const { OK, CREATED, BAD_REQUEST } = require('../../config/statusCode').statusCode;
const followServices = require('../../services/follow');

const userNo = 2;

/*
    GET /api/follows/counts
    * 팔로우 수, 팔로워 수 조회 API
*/
exports.getFollowCounts = async (req, res, next) => {
  try {
    const followCounts = await followServices.getFollowCounts(userNo);

    res.status(OK).json({
      message: '팔로우 수, 팔로워 수 조회 성공',
      data: followCounts,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: '팔로우 수, 팔로워 수 조회 실패',
    });
  }
};

/*
    GET /api/follows/following
    * 내가 팔로우한 사람 목록 조회 API
*/
exports.getFollowingList = async (req, res, next) => {
  try {
    const followingList = await followServices.getFollowingList(userNo);

    res.status(OK).json({
      message: '내가 팔로우한 사람 목록 조회 성공',
      data: followingList,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: '내가 팔로우한 사람 목록 조회 실패',
    });
  }
};

/*
    GET /api/follows/followed
    * 나를 팔로우 하는 사람 목록 조회 API
*/
exports.getFollowedList = async (req, res, next) => {
  try {
    const followedList = await followServices.getFollowedList(userNo);

    res.status(OK).json({
      message: '나를 팔로우 하는 사람 목록 조회 성공',
      data: followedList,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: '나를 팔로우 하는 사람 목록 조회 실패',
    });
  }
};

/*
    POST /api/follows
    * 팔로우 추가 API
*/
exports.setFollowing = async (req, res, next) => {
  try {
    const { followingNo } = req.body;
    const result = await followServices.setFollowing({ userNo, followingNo });
    res.status(CREATED).json({
      message: '팔로우 추가 성공',
      followNo: result.no,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: '팔로우 추가 실패',
    });
  }
};

/*
    DELETE /api/follows/:no
    * 팔로우 삭제 API
*/
exports.deleteFollowing = async (req, res, next) => {
  const { no } = req.params;
  try {
    await followServices.deleteFollowing(no);
    res.status(OK).json({
      message: '팔로우 삭제 성공',
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: '팔로우 삭제 실패',
    });
  }
};