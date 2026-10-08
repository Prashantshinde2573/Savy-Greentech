import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

function netlifyFunctionsDevPlugin() {
  return {
    name: "netlify-functions-dev",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        if (parsedUrl.pathname === "/.netlify/functions/submit-contact-form") {
          try {
            const { handler } = await import("./netlify/functions/submit-contact-form.js");

            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", async () => {
              const event = {
                httpMethod: req.method,
                headers: req.headers,
                body: body,
                queryStringParameters: Object.fromEntries(parsedUrl.searchParams.entries()),
              };

              const result = await handler(event);
              res.statusCode = result.statusCode || 200;
              if (result.headers) {
                for (const [key, value] of Object.entries(result.headers)) {
                  res.setHeader(key, value);
                }
              }
              res.end(result.body || "");
            });
            return;
          } catch (err) {
            console.error("Local netlify function error:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message: "Internal Server Error executing local Netlify function.",
              })
            );
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.NARRATIVE_FORMS_API_KEY && !process.env.NARRATIVE_FORMS_API_KEY) {
    process.env.NARRATIVE_FORMS_API_KEY = env.NARRATIVE_FORMS_API_KEY;
  }
  const rootEnv = loadEnv(mode, path.resolve(process.cwd(), ".."), "");
  if (rootEnv.NARRATIVE_FORMS_API_KEY && !process.env.NARRATIVE_FORMS_API_KEY) {
    process.env.NARRATIVE_FORMS_API_KEY = rootEnv.NARRATIVE_FORMS_API_KEY;
  }

  return {
    build: {
      outDir: "dist/client",
    },
    optimizeDeps: {
      include: ["react", "react-dom/client"],
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: ["terminal.local"],
      warmup: {
        clientFiles: ["./src/main.jsx"],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    plugins: [react(), tailwindcss(), netlifyFunctionsDevPlugin()],
  };
});

