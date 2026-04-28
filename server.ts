import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuración y Datos de Respaldo (Fallback) ---
const SPRING_BOOT_URL = process.env.VITE_SPRING_BOOT_API_URL || 'http://localhost:8080/api';

// Datos Mock (se usarán si el backend no responde o no está configurado)
let mockPets = [
  { id: 1, name: "Max", type: "Perro", breed: "Beagle", gender: "Macho", status: "lost", location: "Parque Central, Puerto Montt", coordinates: [-41.4693, -72.9424] as [number, number], timeAgo: "Hace 2 horas", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800" },
  { id: 2, name: "Luna", type: "Gato", breed: "Mestizo", gender: "Hembra", status: "lost", location: "Avenida Italia, Puerto Varas", coordinates: [-41.3193, -72.9824] as [number, number], timeAgo: "Hace 5 horas", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800" }
];

let mockNotifications = [
  { id: '1', title: 'Posible avistamiento', message: 'Alguien cree haber visto a Max...', type: 'alert', time: '5m', read: false }
];

const api = axios.create({
  baseURL: SPRING_BOOT_URL,
  timeout: 3000, // Timeout corto para no lentizar la UI si el backend está caído
  headers: { 'Content-Type': 'application/json' }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes (BFF Layer con Fallback) ---

  app.get('/api/pets', async (req, res) => {
    try {
      const response = await api.get('/pets', { params: req.query });
      res.json(response.data);
    } catch (error: any) {
      console.warn(`[BFF] Backend Spring Boot no disponible en ${SPRING_BOOT_URL}. Usando Mock Data.`);
      res.json(mockPets);
    }
  });

  app.post('/api/pets/report', async (req, res) => {
    try {
      const response = await api.post('/pets/report', req.body);
      res.status(response.status).json(response.data);
    } catch (error: any) {
      const newPet = { id: mockPets.length + 1, ...req.body, status: 'lost', timeAgo: 'Recién publicado' };
      mockPets.push(newPet);
      res.status(201).json({ id: newPet.id, status: 'success', message: 'Guardado localmente (Backend offline)' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const response = await api.post('/auth/login', req.body);
      res.json(response.data);
    } catch (error: any) {
      // Credenciales de prueba si el backend falla
      if (req.body.email === 'admin@test.com') {
        res.json({ token: 'mock-token', user: { id: 'u1', name: 'Juan (Modo Offline)', email: req.body.email } });
      } else {
        res.status(401).json({ message: 'Modo Offline: Usa admin@test.com' });
      }
    }
  });

  app.get('/api/notifications', async (req, res) => {
    try {
      const response = await api.get('/notifications');
      res.json(response.data);
    } catch {
      res.json(mockNotifications);
    }
  });

  app.get('/api/success-stories', async (req, res) => {
    try {
      const response = await api.get('/success-stories');
      res.json(response.data);
    } catch {
      res.json([{ id: 1, title: "Historias Offline", content: "El backend no está conectado aún.", image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=800" }]);
    }
  });

  // --- Vite & Production Setup ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BFF Gateway running on http://localhost:${PORT}`);
    console.log(`Configured to proxy to Spring Boot at: ${SPRING_BOOT_URL}`);
  });
}

startServer();
