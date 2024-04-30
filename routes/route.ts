import express from "express";
const router = express.Router();

import { testRoute } from "../controllers/test";

router.get("/test", testRoute)

export default router;