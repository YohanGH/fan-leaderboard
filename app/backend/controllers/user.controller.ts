import { Request, Response } from 'express';
import { listUsers, getUserById, createUser } from '../database/db';
import { IApiErrorResponse } from '../types';

export const userController = {
  list: (req: Request, res: Response) => {
    const users = listUsers().map(u => {
      const { password, ...rest } = u;
      return rest;
    });
    res.json({ users });
  },

  get: (req: Request, res: Response) => {
    const user = getUserById(req.params.id);
    if (!user) {
      const error: IApiErrorResponse = {
        status: 'error',
        code: 404,
        message: 'User not found',
      };
      res.status(404).json(error);
      return;
    }
    const { password, ...rest } = user;
    res.json(rest);
  },

  create: (req: Request, res: Response) => {
    const { username, password, email, role } = req.body;
    if (!username || !password) {
      const error: IApiErrorResponse = {
        status: 'error',
        code: 400,
        message: 'Missing username or password',
      };
      res.status(400).json(error);
      return;
    }
    const id = createUser({
      username,
      password,
      email,
      role: role || 'user',
      score_current: 0,
      score_weekly_change: 0,
      score_rank: 0,
      score_total_users: 0,
      score_level: 'Rookie',
      score_next_level: 0,
    });
    res.json({ id });
  },
};
