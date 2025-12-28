import { Prompt as PromptModel } from "../models";
import userstsDal from "../dalLayer/users-dal";
import { User as UserModel } from "../models";

export default class usersService {
    
    constructor(private usersDal:userstsDal ) {}

    async createUser(id: string, name: string, phoneNumber: string,role:"user" | "admin"):Promise<string>{
        const user: UserModel = {
            id: id,
            name: name,
            phoneNumber: phoneNumber,
            role: role
        };
        return await this.usersDal.createUser(user);
    }

    async getAllUsersWithHistory():Promise<any[]>{
        return await this.usersDal.getAllUsersWithHistory();
    }

    async getUserById(id: string): Promise<UserModel | null> {  
        return await this.usersDal.getUserById(id);
    }
}