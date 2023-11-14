import express from "express";
import { requireAuth } from "sanction-common";

const router = express.Router();

router.get("/api/users/validate-token", requireAuth, (req, res) => {
  res.send(req.token!);
});

export { router as validateTokenRouter };
