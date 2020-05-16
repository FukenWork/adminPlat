import axios from 'axios';
import UserInfoUrl from '../url/user';
import httpLink from '../common/business-config';
import { stringFormatArr } from '../utils/string-format';
const BaseUrl = httpLink.baseUrl;

const loginServices = {
    // 用户信息登录
    oginByUserNameAndPassword(userName, password) {
        const url = stringFormatArr(`${BaseUrl}${UserInfoUrl.userLoginUserNameAndPassword}`, { userName, password });;
        return axios.get(url);
    },
    // 获取用户信息分页
    getUserInfoListByPageAndSize(page, size) {
        const url = stringFormatArr(`${BaseUrl}${UserInfoUrl.getUserInfoList}`, { page, size });
        return axios.get(url);
    },
    // 根据名字模糊查询用户
    getUserInfoByUserName(username, page, size) {
        const url = stringFormatArr(BaseUrl + UserInfoUrl.getUserInfoByName, { username, page, size });
        return axios.get(url);
    },
    // 注销用户
    deleteUserInfoById(id) {
        const url = stringFormatArr(BaseUrl + UserInfoUrl.delteUserInfoById, { id });
        return axios.delete(url);
    },
    // 用户注册
    registorUser(userInfo) {
        const url = BaseUrl + UserInfoUrl.register;
        return axios.post(url, userInfo);
    },
    // 模糊查询用户
    findUserInfoByUsername(userName, page, size) {
        const url = stringFormatArr(BaseUrl + UserInfoUrl.findUserByUser, { userName, page, size });
        return axios.get(url);
    }
}
export default loginServices;