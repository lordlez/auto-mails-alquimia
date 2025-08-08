import express from "express";
import { sendUserEmail, sendAdminEmail } from "../services/mailer.js";
import { saveLead } from "../services/storage.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, email, empresa, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Guardar lead
    await saveLead({ nombre, email, empresa, mensaje, fecha: new Date() });

    // Enviar email al usuario
    await sendUserEmail(nombre, email);

    // Enviar email al admin
    await sendAdminEmail({ nombre, email, empresa, mensaje });

    res.status(200).json({ success: true, message: "Lead procesado con éxito" });
  } catch (error) {
    console.error("Error en contacto:", error.message);
    res.status(500).json({ error: "Error al procesar el contacto" });
  }
});

export default router;
