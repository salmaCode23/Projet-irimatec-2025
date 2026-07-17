import express from "express";

import {
    index,
    show,
    store,
    update,
    destroy
} from "../controllers/ProjetController.js";

import verifyToken from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/projets", index);

router.get("/projets/:id", show);

router.post(
    "/projets",
    verifyToken,
    upload.single("image"),
    store
);

router.put(
    "/projets/:id",
    verifyToken,
    upload.single("image"),
    update
);

router.delete(
    "/projets/:id",
    verifyToken,
    destroy
);

export default router;