import axios from 'axios';
import UserInfoUrl from '../url/user';
import httpLink from '../common/business-config';
import { stringFormatArr } from '../utils/string-format';
const BaseUrl = httpLink.baseUrl;

const loginServices = {
    // 用户信息登录
    login(username, password) {
        const url = stringFormatArr(`${BaseUrl}${UserInfoUrl.login}`, { username, password });;
        return axios.get(url);
    },
    // 获取用户信息分页
    getUserInfoListByPageAndSize(page, size) {
        const url = stringFormatArr(`${BaseUrl}${UserInfoUrl.getPageAndSize}`, { page, size });
        return axios.get(url);
    },
    // 注销用户
    deleteUserInfoById(id) {
        const url = stringFormatArr(BaseUrl + UserInfoUrl.deleteUserById, { id });
        return axios.delete(url);
    },
    // 用户注册
    registorUser(userInfo) {
        const url = BaseUrl + UserInfoUrl.register;
        return axios.post(url, userInfo);
    },
    // 模糊查询用户
    findUserInfoByUsername(username) {
        const url = stringFormatArr(BaseUrl + UserInfoUrl.searchUserByUsername, { username });
        return axios.get(url);
    }
}
export default loginServices;