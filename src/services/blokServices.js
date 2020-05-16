import axios from 'axios';
import blokUrl from '../url/blok-url';
import httpLink from '../common/business-config';
import { stringFormatArr } from '../utils/string-format';

const BaseUrl = httpLink.baseUrl;

const blokServices = {
    // 添加类型名称
    async addTypeTitleName(typeInfo) {
        const url = BaseUrl + blokUrl.addTypeTitleName
        return await axios.post(url, typeInfo);
    },
    async getListType() {
        const url = BaseUrl + blokUrl.getListTypeName;
        return await axios.get(url)
    },
    async deleteTypeNameById(id) {
        const url = stringFormatArr(BaseUrl + blokUrl.deleteTypeNameById, { id })
        return await axios.delete(url);
    }
}
export default blokServices;