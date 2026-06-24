import net from "node:net";
import tls from "node:tls";

const recipient = "info@extem.de";

function smtpConfig() {
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);

  return {
    host: process.env.SMTP_HOST,
    port: Number.isFinite(port) ? port : 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
  };
}

export function hasMailConfig() {
  const config = smtpConfig();
  return Boolean(config.host && config.port && config.user && config.pass && config.from);
}

function encodeBase64(value) {
  return Buffer.from(value, "utf8").toString("base64");
}

function sanitizeHeader(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

function createClient(config) {
  return config.secure
    ? tls.connect(config.port, config.host, { servername: config.host })
    : net.connect(config.port, config.host);
}

function readResponse(socket) {
  return new Promise((resolve, reject) => {
    let buffer = "";

    function cleanup() {
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error) {
      cleanup();
      reject(error);
    }

    function onData(chunk) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const lastLine = lines[lines.length - 1] || "";

      if (/^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(buffer);
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function sendCommand(socket, command, expectedCodes) {
  socket.write(`${command}\r\n`);
  const response = await readResponse(socket);
  const code = response.slice(0, 3);

  if (!expectedCodes.includes(code)) {
    throw new Error(`SMTP command failed with ${code}`);
  }

  return response;
}

function buildMessage({ from, subject, text }) {
  const safeSubject = sanitizeHeader(subject);

  return [
    `From: ${from}`,
    `To: ${recipient}`,
    `Subject: ${safeSubject}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    ".",
  ].join("\r\n");
}

export async function sendMail({ subject, text }) {
  const config = smtpConfig();

  if (!hasMailConfig()) {
    console.warn("SMTP configuration missing; daily summary was not sent.");
    return false;
  }

  const socket = createClient(config);

  try {
    await readResponse(socket);
    await sendCommand(socket, `EHLO ${config.host}`, ["250"]);

    if (!config.secure) {
      await sendCommand(socket, "STARTTLS", ["220"]);
      const secureSocket = tls.connect({ socket, servername: config.host });
      await sendCommand(secureSocket, `EHLO ${config.host}`, ["250"]);
      await sendCommand(secureSocket, "AUTH LOGIN", ["334"]);
      await sendCommand(secureSocket, encodeBase64(config.user), ["334"]);
      await sendCommand(secureSocket, encodeBase64(config.pass), ["235"]);
      await sendCommand(secureSocket, `MAIL FROM:<${config.from}>`, ["250"]);
      await sendCommand(secureSocket, `RCPT TO:<${recipient}>`, ["250", "251"]);
      await sendCommand(secureSocket, "DATA", ["354"]);
      await sendCommand(secureSocket, buildMessage({ from: config.from, subject, text }), ["250"]);
      await sendCommand(secureSocket, "QUIT", ["221"]);
      secureSocket.end();
      return true;
    }

    await sendCommand(socket, "AUTH LOGIN", ["334"]);
    await sendCommand(socket, encodeBase64(config.user), ["334"]);
    await sendCommand(socket, encodeBase64(config.pass), ["235"]);
    await sendCommand(socket, `MAIL FROM:<${config.from}>`, ["250"]);
    await sendCommand(socket, `RCPT TO:<${recipient}>`, ["250", "251"]);
    await sendCommand(socket, "DATA", ["354"]);
    await sendCommand(socket, buildMessage({ from: config.from, subject, text }), ["250"]);
    await sendCommand(socket, "QUIT", ["221"]);
    socket.end();
    return true;
  } catch (error) {
    socket.destroy();
    console.warn(`Daily summary mail failed: ${error.message}`);
    return false;
  }
}
