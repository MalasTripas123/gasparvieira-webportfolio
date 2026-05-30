const resendEndpoint = "https://api.resend.com/emails";
const fallbackRecipientCodes = [
  103, 46, 118, 105, 101, 105, 114, 97, 98, 101, 114, 116, 64, 103, 109, 97,
  105, 108, 46, 99, 111, 109,
];

const decodeCharCodes = (codes) =>
  codes.map((code) => String.fromCharCode(code)).join("");

const readJsonBody = async (request) => {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  if (typeof request.body === "string") {
    return JSON.parse(request.body || "{}");
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatHtml = (value) => escapeHtml(value).replace(/\n/g, "<br>");

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isLocalEnvironment = () =>
  process.env.NODE_ENV !== "production" && process.env.VERCEL_ENV !== "production";

const clientErrorMessage = (fallback, detail) =>
  isLocalEnvironment() && detail ? `${fallback} Detalle: ${detail}` : fallback;

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Metodo no permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return response
      .status(500)
      .json({ message: "Falta configurar RESEND_API_KEY en Vercel." });
  }

  let payload;
  try {
    payload = await readJsonBody(request);
  } catch {
    return response.status(400).json({ message: "El formulario no es valido." });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    return response
      .status(400)
      .json({ message: "Completa nombre, correo y mensaje." });
  }

  if (name.length > 120 || email.length > 180 || message.length > 4000) {
    return response
      .status(400)
      .json({ message: "El mensaje es demasiado largo." });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({ message: "Ingresa un correo valido." });
  }

  const recipient =
    process.env.CONTACT_TO_EMAIL || decodeCharCodes(fallbackRecipientCodes);
  const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const subject = `Nuevo mensaje desde el portafolio - ${name}`;
  const text = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");
  const html = `
    <div style="font-family: Arial, sans-serif; color: #191827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">Nuevo mensaje desde el portafolio</h2>
      <p><strong>Nombre:</strong> ${formatHtml(name)}</p>
      <p><strong>Correo:</strong> ${formatHtml(email)}</p>
      <div style="margin-top: 20px;">
        <strong>Mensaje:</strong>
        <p style="white-space: normal;">${formatHtml(message)}</p>
      </div>
    </div>
  `;

  try {
    const resendResponse = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipient,
        subject,
        text,
        html,
        reply_to: email,
      }),
    });
    const result = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend error", result);
      return response
        .status(502)
        .json({
          message: clientErrorMessage(
            "No se pudo enviar el mensaje.",
            result.message,
          ),
        });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    const tlsHint =
      error?.cause?.code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE"
        ? "Node no pudo verificar el certificado de Resend. Reinicia el servidor local con npm run dev para usar los certificados del sistema."
        : error.message;

    return response
      .status(500)
      .json({
        message: clientErrorMessage("No se pudo enviar el mensaje.", tlsHint),
      });
  }
}
