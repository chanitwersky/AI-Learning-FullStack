import { Router } from "express";
import usersService from "../serviceLayer/users-service";
import userController from "../controller/users-controller";
import MiddlewareHandler from "../middleware/middleware-handler";



export default class UsersApi {
    private router: Router;
    private usersController: userController;
    constructor(private usersService: usersService) {
        this.router = Router();
        this.usersController = new userController();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.post("/user", this.usersController.createUser.bind(this.usersController));
        this.router.get("/users-history", MiddlewareHandler.isAdmin(this.usersService), 
        this.usersController.getAllUsersWithHistory.bind(this.usersController));
        this.router.get("/user/:id", this.usersController.getUserById.bind(this.usersController));
        

    }
}