import { Request, Response } from 'express';
import AiService from '../serviceLayer/aiService'; 
import { Prompt as PromptModel } from "../models";
import promptsService from '../serviceLayer/prompts-service';
 

export default class PromptController {
    private promptsService!:promptsService;//לבדוק את ענין של סימן קריאה

    constructor() {}
   

    async createPrompt(req: Request, res: Response): Promise<void> {
        try {
            const { userId, category, subCategory, promptText } = req.body;

            if (!promptText) {
                res.status(400).json({ message: "נא לספק טקסט לשיעור" });
                return;
            }

            const lesson = await this.promptsService.createPrompt(userId, category, subCategory, promptText);
            res.status(200).json({
                success: true,
                data: lesson
            });

        } catch (error) {
            console.error("Error in createPrompt:", error);
            res.status(500).json({ 
                success: false, 
                message: "תקלה ביצירת השיעור באמצעות ה-AI" 
            });
        }
    }

    async getPromptsById(req: Request, res: Response):Promise<void>{
        try{
            const id= req.params.userId;
            const prompts=await this.promptsService.getPromptsById(id);
            
            res.status(200).json({
                success: true,
                data: prompts
            });

            }catch (error) {
            console.error("Error in showing history:", error);
            res.status(500).json({ 
                success: false, 
                message: "תקלה בקבלת ההיסטוריה" 
            });
    }

    
}

}


