import { db } from "../../../../config/firebaseConfig.js";

export async function createDocument<T extends Record<string, unknown>>(
  collectionName: string,
  data: T,
  id?: string,
): Promise<T & { id: string }> {
  const collectionRef = db.collection(collectionName);

  if (id) {
    await collectionRef.doc(id).set(data);
    return { id, ...data };
  }

  const docRef = await collectionRef.add(data);
  return { id: docRef.id, ...data };
}

export async function getAllDocuments<T extends Record<string, unknown>>(
  collectionName: string,
): Promise<Array<T & { id: string }>> {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
}

export async function getDocumentById<T extends Record<string, unknown>>(
  collectionName: string,
  id: string,
): Promise<(T & { id: string }) | null> {
  const doc = await db.collection(collectionName).doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...(doc.data() as T) };
}

export async function updateDocument<T extends Record<string, unknown>>(
  collectionName: string,
  id: string,
  data: Partial<T>,
): Promise<(T & { id: string }) | null> {
  const docRef = db.collection(collectionName).doc(id);
  const existing = await docRef.get();

  if (!existing.exists) {
    return null;
  }

  await docRef.update(data);
  const updated = await docRef.get();
  return { id: updated.id, ...(updated.data() as T) };
}

export async function deleteDocument(
  collectionName: string,
  id: string,
): Promise<boolean> {
  const docRef = db.collection(collectionName).doc(id);
  const existing = await docRef.get();

  if (!existing.exists) {
    return false;
  }

  await docRef.delete();
  return true;
}

export async function countDocuments(collectionName: string): Promise<number> {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.size;
}
