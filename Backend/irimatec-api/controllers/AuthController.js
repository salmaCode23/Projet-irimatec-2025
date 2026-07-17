

import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email et mot de passe obligatoires"
            });
        }

        // Chercher l'utilisateur
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                status: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        const user = users[0];

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                status: false,
                message: "Email ou mot de passe incorrect"
            });
        }

        // Générer le JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Ne pas renvoyer le mot de passe
        delete user.password;

        return res.json({
            status: true,
            message: "Connexion réussie",
            token,
            user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Erreur serveur"
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier les champs
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Tous les champs sont obligatoires"
            });
        }

        // Vérifier si l'email existe déjà
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Email déjà utilisé"
            });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur
        const [result] = await db.query(
            "INSERT INTO users(name,email,password,created_at,updated_at) VALUES(?,?,?,NOW(),NOW())",
            [name, email, hashedPassword]
        );

        // Générer le JWT
        const token = jwt.sign(
            {
                id: result.insertId,
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(201).json({
            status: true,
            message: "Compte créé avec succès",
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            status: false,
            message: "Erreur serveur"
        });
    }
};

export const me = async (req, res) => {

    const [users] = await db.query(
        "SELECT id,name,email,role FROM users WHERE id=?",
        [req.user.id]
    );

    if (users.length === 0) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }

    res.json(users[0]);
};
export const logout = (req, res) => {

    res.json({
        status: true,
        message: "Déconnexion réussie"
    });

}