import { Express } from "express";

export function defineBasicRoutes(app: Express) {
  app.get('/', (req, res) => {
    res.json({
      message: 'ML Dashboard API'
    });
  });
}