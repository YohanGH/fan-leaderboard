import { Request, Response } from 'express';
import { IApiErrorResponse } from '../types';
import { getUserByUsername } from '../database/db';

/**
 * Login controller
 * @param req - The request object
 * @param res - The response object
 */
export const authController = {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = getUserByUsername(username);
    if (user && user.password === password) {
      const { password: _pw, ...rest } = user;
      res.json({ success: true, user: rest });
      return;
    }
    const errorResponse: IApiErrorResponse = {
      status: 'error',
      code: 401,
      message: 'Invalid credentials',
    };
    res.status(401).json(errorResponse);
  },
};
