import axios from 'axios';
import blokUrl from '../url/blok-url';
import httpLink from '../common/business-config';
import { stringFormatArr } from '../utils/string-format';

const BaseUrl = httpLink.baseUrl;

const blokServices = {
    // 添加类型名称
    addTypeTitleName(typeInfo) {
        const url = BaseUrl + blokUrl.addTypeTitleName
        return axios.post(url, typeInfo);
    },
    getListType() {
        const url = BaseUrl + blokUrl.getListTypeName;
        return axios.get(url)
    },
    deleteTypeNameById(id) {
        const url = stringFormatArr(BaseUrl + blokUrl.deleteTypeNameById, { id })
        return axios.delete(url);
    },
    // 更新类型信息
    updateTypeInfo(id, info) {
        const url = stringFormatArr(BaseUrl + blokUrl.update, { id });
        return axios.put(url, info);
    },
    getArticleByTypeId(typeName, page, size) {
        const url = stringFormatArr(BaseUrl + blokUrl.getArticleByType, { typeName, page, size });
        return axios.get(url);
    }

}
export default blokServices;