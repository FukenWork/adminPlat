import { combineReducers } from 'redux';
import ActionType from './action-types';

/**
 * 管理头部标题-----------获取类型是ActionTypes
 */

function saveTitleName(state = '', action) {
    switch (action.type) {
        case ActionType.HEADER_TITLE:
            return state = action.data;
        default:
            return state
    }

}
function saveUserInfo(state = '', action) {
    switch (action.type) {
        case ActionType.SAVE_USERINFO:
            return state = action.data;
        default:
            return state || {}
    }
}


const reducer = combineReducers({
    saveTitleName,
    saveUserInfo
});
export default reducer;