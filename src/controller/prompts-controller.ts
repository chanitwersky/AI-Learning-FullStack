import { NextFunction, Request, Response } from 'express';
import AiService from '../serviceLayer/aiService'; 
import { Prompt as PromptModel } from "../models";
import promptsService from '../serviceLayer/prompts-service';

 

export default class PromptController {
    
    constructor(private promptsService: promptsService) {}
   
    async createPrompt(req: any, res: Response,next: NextFunction  ): Promise<void> {
        try {
            const userId = req.user.id; 

            const {  category, subCategory, promptText } = req.body;

            if (!promptText) {
                res.status(400).json({ message: "נא לספק טקסט לשיעור" });
                return;
            }

            const lesson = await this.promptsService.createPrompt(userId, category, subCategory, promptText);
            res.status(200).json({
                success: true,
                data: lesson
            });

        } catch (error:any) {
            console.error("Error in createPrompt:", error);
            res.status(500).json({ 
                success: false, 
                message: "תקלה ביצירת השיעור באמצעות ה-AI" 

            });
            next(error);
        }
    }

    async getLastPrompt(req: any, res: Response,next: NextFunction):Promise<void>{
        try{
            const userId = req.user.id; 

            const response=await this.promptsService.getLastPrompt(userId);
            
            res.status(200).json({
                success: true,
                data: response
            });

            }catch (error) {
            console.error("error by ai response:", error);
            res.status(500).json({ 
                success: false, 
                message: "תקלה ביצירת שיעור" 
            });
            next(error);
            
        }
    }


    async getPromptById(req: any, res: Response,next: NextFunction):Promise<void>{
        try{
            const id= req.params.userId;
            const loggedInUserId = req.user.id;

            if (id !== loggedInUserId) {
                res.status(403).json({ 
                    success: false, 
                    message:"איך לך הרשאה לגשת להיסטוריה של משתמש אחר"
                });
                return;
            }
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
            next(error);
            
        }
    }

}


