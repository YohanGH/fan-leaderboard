import * as db from '../database/db';
import type { User } from '../database/db';

export const userService = {
  list: (): User[] => {
    return db.listUsers();
  },

  getById: (id: string): User | null => {
    return db.getUserById(id);
  },

  getByUsername: (username: string): User | null => {
    return db.getUserByUsername(username);
  },

  create: (user: Omit<User, 'id' | 'created_at' | 'updated_at'>): string => {
    return db.createUser(user);
  },
};
