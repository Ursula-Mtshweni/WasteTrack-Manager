import { z } from "zod";

// Mongoose will generate _id automatically as ObjectId
export interface User {
  _id: string;
  username: string;
  password: string;
}

export interface WastePickup {
  _id: string;
  fullName: string;
  location: string;
  wasteType: string;
  preferredDate?: string | null;
  createdAt: Date;
}

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertWastePickupSchema = z.object({
  fullName: z.string().min(1),
  location: z.string().min(1),
  wasteType: z.string().min(1),
  preferredDate: z.string().optional().nullable(),
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertWastePickup = z.infer<typeof insertWastePickupSchema>;
