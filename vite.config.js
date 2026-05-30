import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import contactHandler from './api/contact.js';

const createVercelResponse = (serverResponse) => ({
  status(statusCode) {
    serverResponse.statusCode = statusCode;
    return this;
  },
  setHeader(name, value) {
    serverResponse.setHeader(name, value);
    return this;
  },
  json(payload) {
    serverResponse.setHeader('Content-Type', 'application/json');
    serverResponse.end(JSON.stringify(payload));
    return this;
  },
  end(payload) {
    serverResponse.end(payload);
    return this;
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  Object.entries(env).forEach(([key, value]) => {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  });

  return {
    plugins: [
      react(),
      {
        name: 'local-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (request, response) => {
            try {
              await contactHandler(request, createVercelResponse(response));
            } catch (error) {
              console.error('Local contact API error', error);
              response.statusCode = 500;
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify({ message: 'No se pudo enviar el mensaje.' }));
            }
          });
        },
      },
    ],
  };
});
