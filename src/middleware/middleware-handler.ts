import { Request, Response, NextFunction } from 'express';

import UsersService from '../serviceLayer/users-service';



export default class MiddlewareHandler {
    public static isAdmin(userService: UsersService) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userId = req.headers['user-id'] as string;
                const user = await userService.getUserById(userId); // עכשיו זה נגיש

                if (user && user.role === 'admin') {
                    return next();
                }
                res.status(403).json({ message: "גישה למנהלים בלבד" });
            } catch (error) {
                res.status(500).json({ message: "שגיאה בבדיקת הרשאות" });
            }
        };
    }

    // Middleware נוסף לדוגמה: בדיקה שה-ID שנשלח תקין
    public static validateUserId(req: Request, res: Response, next: NextFunction) {
        const userId = req.headers['user-id'];
        if (!userId) {
            return res.status(400).json({ message: "חובה לשלוח User ID" });
        }
        next();
    }
}