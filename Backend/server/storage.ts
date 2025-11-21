import { type User, type InsertUser, type WastePickup, type InsertWastePickup } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createWastePickup(pickup: InsertWastePickup): Promise<WastePickup>;
  getWastePickup(id: string): Promise<WastePickup | undefined>;
  getAllWastePickups(): Promise<WastePickup[]>;
  updateWastePickup(id: string, pickup: Partial<InsertWastePickup>): Promise<WastePickup | undefined>;
  deleteWastePickup(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private wastePickups: Map<string, WastePickup>;

  constructor() {
    this.users = new Map();
    this.wastePickups = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWastePickup(insertPickup: InsertWastePickup): Promise<WastePickup> {
    const id = randomUUID();
    const pickup: WastePickup = { 
      ...insertPickup,
      preferredDate: insertPickup.preferredDate || null,
      id,
      createdAt: new Date()
    };
    this.wastePickups.set(id, pickup);
    return pickup;
  }

  async getWastePickup(id: string): Promise<WastePickup | undefined> {
    return this.wastePickups.get(id);
  }

  async getAllWastePickups(): Promise<WastePickup[]> {
    return Array.from(this.wastePickups.values());
  }

  async updateWastePickup(id: string, updateData: Partial<InsertWastePickup>): Promise<WastePickup | undefined> {
    const existing = this.wastePickups.get(id);
    if (!existing) return undefined;
    
    const updated: WastePickup = { ...existing, ...updateData };
    this.wastePickups.set(id, updated);
    return updated;
  }

  async deleteWastePickup(id: string): Promise<boolean> {
    return this.wastePickups.delete(id);
  }
}

export const storage = new MemStorage();
