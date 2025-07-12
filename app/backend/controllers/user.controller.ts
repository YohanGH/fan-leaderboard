import { Request, Response } from 'express';
import { userService } from '../services/user';
import { IApiErrorResponse } from '../types';

export const userController = {
  list: async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = userService.list();
      res.json(users);
    } catch (error) {
      const err: IApiErrorResponse = {
        status: 'error',
        code: 500,
        message: (error instanceof Error ? error.message : 'Unknown error'),
      };
      res.status(500).json(err);
    }
  },

  get: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = userService.getById(req.params.id);
      if (!user) {
        const err: IApiErrorResponse = {
          status: 'error',
          code: 404,
          message: 'User not found',
        };
        res.status(404).json(err);
        return;
      }
      res.json(user);
    } catch (error) {
      const err: IApiErrorResponse = {
        status: 'error',
        code: 500,
        message: (error instanceof Error ? error.message : 'Unknown error'),
      };
      res.status(500).json(err);
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, role } = req.body as {
        username: string; email?: string; role?: string;
      };
      if (!username) {
        const err: IApiErrorResponse = { status: 'error', code: 400, message: 'username required' };
        res.status(400).json(err);
        return;
      }
      const id = userService.create({ username, email, role: role || 'user' });
      res.status(201).json({ id });
    } catch (error) {
      const err: IApiErrorResponse = {
        status: 'error',
        code: 500,
        message: (error instanceof Error ? error.message : 'Unknown error'),
      };
      res.status(500).json(err);
    }
  },
};
