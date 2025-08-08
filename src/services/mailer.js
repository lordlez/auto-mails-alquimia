import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const brevoAPI = "https://api.brevo.com/v3/smtp/email";
const headers = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
};

export async function sendUserEmail(nombre, email) {
  const data = {
    sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME },
    to: [{ email }],
    subject: "Gracias por contactarte con Alquimia",
    htmlContent: `<p>Hola <strong>${nombre}</strong>,</p>
    <p>Gracias por contactarte con <strong>Alquimia</strong>. Hemos recibido tu mensaje y te responderemos pronto.</p>
    <p>Saludos,<br>Equipo Alquimia</p>`
  };

  await axios.post(brevoAPI, data, { headers });
}

export async function sendAdminEmail({ nombre, email, empresa, mensaje }) {
  const data = {
    sender: { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME },
    to: [{ email: process.env.ADMIN_EMAIL }],
    subject: "Nuevo contacto desde la web",
    htmlContent: `<p><strong>Nuevo lead recibido:</strong></p>
    <ul>
      <li><strong>Nombre:</strong> ${nombre}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Empresa:</strong> ${empresa || "No especificada"}</li>
      <li><strong>Mensaje:</strong> ${mensaje}</li>
    </ul>`
  };

  await axios.post(brevoAPI, data, { headers });
}
