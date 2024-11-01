import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createUser(name: string, email: string) {
  return db.insert(users).values({ name, email });
}

// Read
export async function getAllUsers() {
  return db.select().from(users);
}

export async function getUserById(id: number) {
  return db.select().from(users).where(eq(users.id, id)).get();
}

// Update
export async function updateUser(id: number, name: string, email: string) {
  return db.update(users)
    .set({ name, email })
    .where(eq(users.id, id));
}

// Delete
export async function deleteUser(id: number) {
  return db.delete(users).where(eq(users.id, id));
}