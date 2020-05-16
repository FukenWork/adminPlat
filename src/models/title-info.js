// ts语法
// const TitleInfo = {
//     createdPerId: string,
//     createdPerson: string,
//     createdRoleId: string,
//     titleName: string,
//     titleType: string,
// }

// export default TitleInfo;

// js构造函数的方式
export class TitleInfo {
    constructor(createdPerId, createdPerson, createdRoleId, titleName, titleType) {
        this.createdPerId = createdPerId;
        this.createdPerson = createdPerson;
        this.createdRoleId = createdRoleId;
        this.titleName = titleName;
        this.titleType = titleType;
    }
}