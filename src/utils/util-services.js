import roleKey from '../common/role';


export const roleChange = (id) => {
    switch (id) {
        case 2:
            return roleKey.ADMIN;
        case 1:
            return roleKey.VIP;
        case 0:
            return roleKey.COMMON;
        case 3:
            return roleKey.SUPER_ADMIN;
        default:
            return;
    }
}