import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("../serviceAccountKey.json", import.meta.url), "utf8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const now = new Date().toISOString();
const event = {
  name: "Tech Conference 2025",
  date: "2099-12-25T09:00:00.000Z",
  capacity: 200,
  registrationCount: 50,
  status: "active",
  category: "conference",
  createdAt: now,
  updatedAt: now,
};

const id = "evt_000001";

try {
  await db.collection("events").doc(id).set(event);
  const snap = await db.collection("events").get();
  console.log(
    JSON.stringify(
      {
        ok: true,
        projectId: serviceAccount.project_id,
        wrote: id,
        count: snap.size,
        ids: snap.docs.map((d) => d.id),
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.error("SEED_FAILED");
  console.error(error?.message || error);
  if (error?.code) console.error("code:", error.code);
  process.exit(1);
}
