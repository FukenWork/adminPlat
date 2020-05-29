const UserInfoUrl = {
    // 用户登录
    login: '/api/v1/username/{username}/password/{password}',

    getPageAndSize: '/api/v1/getUserInfoBypageAndSize/{page}/{size}?page={page}&size={size}',

    searchUserByUsername: '/api/v1/username/{username}',

    deleteUserById: '/api/v1/{id}',

    register: '/api/v1/save'


}

export default UserInfoUrl