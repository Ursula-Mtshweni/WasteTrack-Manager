import { type Server } from "node:http";
import { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // When deployed to Render, the backend is API-only
  // The frontend is separately deployed to Vercel
  // No static files to serve
}

(async () => {
  await runApp(serveStatic);
})();
