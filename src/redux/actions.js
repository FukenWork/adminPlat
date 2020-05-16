/**
 * 函数工厂----分发action  dispatch
 * 储存全局数据更改数据相当于action
 */

import ActionType from './action-types';

export const headTitleHandle = (data) => ({
    type: ActionType.HEADER_TITLE,
    data: data
});

export const handleSaveUserInfo = (data) =>({
    type: ActionType.SAVE_USERINFO,
    data: data
})