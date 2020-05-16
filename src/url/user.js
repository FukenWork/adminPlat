const UserInfoUrl = {
    // 用户登录
    userLoginUserNameAndPassword: '/api/v1/login/{userName}/{password}',
    getUserInfoList: '/api/v1/userInfo/{page}/{size}?page={page}&size={size}',
    getUserInfoByName: '/api/v1/findByUserName/{userName}/{page}/{size}?page={page}&size={size}',
    delteUserInfoById: '/api/v1/deleteUser/{id}',
    register: '/api/v1/userInfo',
    findUserByUser: '/api/v1/findByUserName/{userName}/{page}/{size}?page={page}&size={size}'
}

export default UserInfoUrl