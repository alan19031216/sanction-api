import express from "express";

const router = express.Router();

router.post("/api/admins/signout", (req, res) => {
  res.send({});
});

export { router as signoutRouter };
