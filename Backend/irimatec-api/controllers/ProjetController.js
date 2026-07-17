import db from "../config/db.js";
import fs from "fs";

// GET /api/projets
export const index = async (req, res) => {
    try {

        const [rows] = await db.query(
            "SELECT * FROM projet ORDER BY created_at DESC"
        );

        res.json(rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }
};

// GET /api/projets/:id
export const show = async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM projet WHERE id=?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Projet introuvable"
            });

        }

        res.json(rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }

};

// POST /api/projets
export const store = async (req, res) => {

    try {

        const { title, description, location, status } = req.body;

        let image = null;

        if (req.file) {
            image = req.file.filename;
        }

        const [result] = await db.query(

            `INSERT INTO projet
            (title,description,location,status,image,created_at,updated_at)
            VALUES(?,?,?,?,?,NOW(),NOW())`,

            [
                title,
                description,
                location,
                status,
                image
            ]

        );

        const [rows] = await db.query(
            "SELECT * FROM projet WHERE id=?",
            [result.insertId]
        );

        res.status(201).json(rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }

};

// PUT /api/projets/:id
export const update = async (req, res) => {

    try {

        const { title, description, location, status } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM projet WHERE id=?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Projet introuvable"
            });

        }

        let image = rows[0].image;

        if (req.file) {

            if (image && fs.existsSync("./uploads/" + image)) {

                fs.unlinkSync("./uploads/" + image);

            }

            image = req.file.filename;

        }

        await db.query(

            `UPDATE projet
            SET
            title=?,
            description=?,
            location=?,
            status=?,
            image=?,
            updated_at=NOW()
            WHERE id=?`,

            [
                title,
                description,
                location,
                status,
                image,
                req.params.id
            ]

        );

        const [updated] = await db.query(
            "SELECT * FROM projet WHERE id=?",
            [req.params.id]
        );

        res.json(updated[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }

};

// DELETE /api/projets/:id
export const destroy = async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM projet WHERE id=?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Projet introuvable"
            });

        }

        if (rows[0].image && fs.existsSync("./uploads/" + rows[0].image)) {

            fs.unlinkSync("./uploads/" + rows[0].image);

        }

        await db.query(
            "DELETE FROM projet WHERE id=?",
            [req.params.id]
        );

        res.json({
            message: "Deleted successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Erreur serveur"
        });

    }

};