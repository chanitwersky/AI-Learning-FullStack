import { Router, Request, Response } from "express";

import PromptController from "../controller/prompts-controller";
import PromptsService from "../serviceLayer/prompts-service";

export default class PromptsApi {
    private router: Router;
    private promptsController: PromptController;
    constructor(private promptsService: PromptsService) {
        this.router = Router();
        this.promptsController = new PromptController();
        this.setRoutes();
    }
    private setRoutes() {
        this.router.post("/create-prompt", this.promptsController.createPrompt.bind(this.promptsController));
        this.router.get("/prompts/:id",this.promptsController.getPromptsById.bind(this.promptsController));
        
    }
}

    