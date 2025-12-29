import { Router } from "express";
import usersService from "../serviceLayer/users-service";
import userController from "../controller/users-controller";
import MiddlewareHandler from "../middleware/middleware-handler";




export default class UsersApi {
    private router: Router;
    private usersController: userController;
    private middleware: MiddlewareHandler;
    constructor(private usersService: usersService) {
        this.router = Router();
        this.usersController = new userController(this.usersService);
        this.middleware = new MiddlewareHandler();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.post("/user", MiddlewareHandler.validateNewUser, this.usersController.createUser.bind(this.usersController));
        this.router.get("/users-history",this.middleware.verifyToken, MiddlewareHandler.isAdmin(this.usersService), 
        this.usersController.getAllUsersWithHistory.bind(this.usersController));
        this.router.get("/user/:id",this.middleware.verifyToken, this.usersController.getUserById.bind(this.usersController));

    }

    public getRouter() {
        return this.router;
    } 
    
}