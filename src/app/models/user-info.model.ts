export class UserInfo {
    id: string;
    name: string;

    constructor(init?: Partial<UserInfo>){
        Object.assign(this, init)
    }
}