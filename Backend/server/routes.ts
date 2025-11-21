import type { Express, Response, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWastePickupSchema } from "@shared/schema";

// Development mode - all routes accessible without auth
const optionalAuth = (_req: Request, _res: Response, next: any) => next();

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/secure-test", optionalAuth, (req: Request, res: Response) => {
    const userId = (req as any).auth?.userId || "dev-user";
    res.json({ 
      message: "This is a protected route", 
      userId 
    });
  });

  app.post("/api/waste-pickups", optionalAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertWastePickupSchema.parse(req.body);
      const pickup = await storage.createWastePickup(validatedData);
      res.status(201).json(pickup);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/waste-pickups", optionalAuth, async (req: Request, res: Response) => {
    const pickups = await storage.getAllWastePickups();
    res.json(pickups);
  });

  app.get("/api/waste-pickups/:id", optionalAuth, async (req: Request, res: Response) => {
    const pickup = await storage.getWastePickup(req.params.id);
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }
    res.json(pickup);
  });

  app.patch("/api/waste-pickups/:id", optionalAuth, async (req: Request, res: Response) => {
    try {
      const pickup = await storage.updateWastePickup(req.params.id, req.body);
      if (!pickup) {
        return res.status(404).json({ message: "Pickup not found" });
      }
      res.json(pickup);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/waste-pickups/:id", optionalAuth, async (req: Request, res: Response) => {
    const deleted = await storage.deleteWastePickup(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Pickup not found" });
    }
    res.json({ message: "Pickup deleted successfully" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
