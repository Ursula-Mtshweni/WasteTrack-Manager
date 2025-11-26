import mongoose, { Schema, Document } from "mongoose";
import { type User, type InsertUser, type WastePickup, type InsertWastePickup } from "@shared/schema";

// Mongoose Document interfaces
interface UserDoc extends Document, Omit<User, '_id'> {}
interface WastePickupDoc extends Document, Omit<WastePickup, '_id'> {}

// Mongoose Schemas
const userSchema = new Schema<UserDoc>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const wastePickupSchema = new Schema<WastePickupDoc>({
  fullName: { type: String, required: true },
  location: { type: String, required: true },
  wasteType: { type: String, required: true },
  preferredDate: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Mongoose Models
const UserModel = mongoose.model<UserDoc>("User", userSchema);
const WastePickupModel = mongoose.model<WastePickupDoc>("WastePickup", wastePickupSchema);

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

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      if (!user) return undefined;
      return {
        _id: user._id.toString(),
        username: user.username,
        password: user.password,
      };
    } catch (error) {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;
      return {
        _id: user._id.toString(),
        username: user.username,
        password: user.password,
      };
    } catch (error) {
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = new UserModel(insertUser);
    await user.save();
    return {
      _id: user._id.toString(),
      username: user.username,
      password: user.password,
    };
  }

  async createWastePickup(insertPickup: InsertWastePickup): Promise<WastePickup> {
    const pickup = new WastePickupModel({
      ...insertPickup,
      createdAt: new Date(),
    });
    await pickup.save();
    return {
      _id: pickup._id.toString(),
      fullName: pickup.fullName,
      location: pickup.location,
      wasteType: pickup.wasteType,
      preferredDate: pickup.preferredDate || null,
      createdAt: pickup.createdAt,
    };
  }

  async getWastePickup(id: string): Promise<WastePickup | undefined> {
    try {
      const pickup = await WastePickupModel.findById(id);
      if (!pickup) return undefined;
      return {
        _id: pickup._id.toString(),
        fullName: pickup.fullName,
        location: pickup.location,
        wasteType: pickup.wasteType,
        preferredDate: pickup.preferredDate || null,
        createdAt: pickup.createdAt,
      };
    } catch (error) {
      return undefined;
    }
  }

  async getAllWastePickups(): Promise<WastePickup[]> {
    try {
      const pickups = await WastePickupModel.find().sort({ createdAt: -1 });
      return pickups.map((pickup) => ({
        _id: pickup._id.toString(),
        fullName: pickup.fullName,
        location: pickup.location,
        wasteType: pickup.wasteType,
        preferredDate: pickup.preferredDate || null,
        createdAt: pickup.createdAt,
      }));
    } catch (error) {
      return [];
    }
  }

  async updateWastePickup(id: string, updateData: Partial<InsertWastePickup>): Promise<WastePickup | undefined> {
    try {
      const pickup = await WastePickupModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!pickup) return undefined;
      return {
        _id: pickup._id.toString(),
        fullName: pickup.fullName,
        location: pickup.location,
        wasteType: pickup.wasteType,
        preferredDate: pickup.preferredDate || null,
        createdAt: pickup.createdAt,
      };
    } catch (error) {
      return undefined;
    }
  }

  async deleteWastePickup(id: string): Promise<boolean> {
    try {
      const result = await WastePickupModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      return false;
    }
  }
}

// Export storage instance (will be initialized after MongoDB connection)
export let storage: IStorage;

export async function initializeStorage(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  
  await mongoose.connect(mongoUri);
  storage = new MongoStorage();
  console.log("MongoDB connected and storage initialized");
}

