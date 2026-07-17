import express from "express";
import cors from "cors";
import authRoutes from "../routes/auth.js";
import projetRoutes from "../routes/projet.js";
import path from "path";
import db from "../config/db.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test
app.get("/", (req, res) => {
    res.json({
        message: "API IRIMATEC fonctionne "
    });
});
app.use("/api", authRoutes);
app.use("/api", projetRoutes);
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 3000;
async function testDB() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Base de données connectée !");
        connection.release();
    } catch (error) {
        console.error("❌ Erreur MySQL :", error.message);
    }
}

testDB();
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;