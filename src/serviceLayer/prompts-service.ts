import SubCategoriesDal from "../dalLayer/Categories-dal";
import promptsDal from "../dalLayer/prompts-dal";
import { Prompt as PromptModel } from "../models";
import { Sub_category as SubCategoryModel } from "../models";
import aiService from "./aiService";


export default class promptsService {
    private prompt!:PromptModel;
    private aiService:aiService=new aiService();
    constructor(private promptsDal:promptsDal ,private subCategoriesDal:SubCategoriesDal) {}
    
    
    
    async createPrompt(userId:string,Category:string,Sub_category:string,promptText:string): Promise<string>{ {
        
        const id = String(Math.ceil(Math.random() * 100000));
        const categoryId= await this.subCategoriesDal.getcategoryId(Sub_category);
        const subCategoryId= await this.subCategoriesDal.getSubCategoryId(Sub_category);
        const aiResponse = await this.aiService.getLessonMoke(Category, Sub_category, promptText);
        

        const newPrompt: PromptModel = {
        id: id,
        userId: userId,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        prompt: promptText,
        response: aiResponse,
        createdAt: new Date()
        };

        return await this.promptsDal.createPrompt(newPrompt);
    }
    }

    async getPromptsById(userId:string):Promise<Array<PromptModel>>{
        return await this.promptsDal.getPromptsByUserId(userId);
    }

    async getLastPrompt(userId:string):Promise<string>{
        return await this.promptsDal.getLastPrompt(userId);
    }


}
