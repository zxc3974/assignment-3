import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadServiceAccount(): Record<string, unknown> | null {
  const credentialsPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    join(__dirname, "..", "serviceAccountKey.json");

  try {
    const raw = readFileSync(credentialsPath, "utf8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function initFirebase(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  const serviceAccount = loadServiceAccount();

  if (!serviceAccount) {
    // Allow app/tests to load without credentials; repository calls will fail at runtime
    return initializeApp({ projectId: "demo-assignment-3" });
  }

  return initializeApp({
    credential: cert(serviceAccount as Parameters<typeof cert>[0]),
  });
}

const app = initFirebase();
export const db: Firestore = getFirestore(app);
