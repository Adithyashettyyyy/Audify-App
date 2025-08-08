import "dotenv/config";
import { createServer } from "./index";

const app = createServer();
const port = process.env.PORT || 3000;

// API-only server - no client files
app.get("/", (req, res) => {
  res.json({ 
    message: "Audify API Server", 
    version: "1.0.0",
    endpoints: {
      health: "/api/ping",
      spotify: "/api/spotify/*",
      docs: "https://github.com/your-username/Audify-App"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(port, () => {
  console.log(`🚀 Audify API Server running on port ${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
  console.log(`📊 Health: http://localhost:${port}/health`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
