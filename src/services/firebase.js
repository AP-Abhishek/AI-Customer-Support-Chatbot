
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveConversation = async (conversation, summary) => {
    try {
        const docRef = await addDoc(collection(db, "support_tickets"), {
            conversation,
            summary: summary.summary,
            category: summary.category,
            priority: summary.priority,
            createdAt: serverTimestamp(),
            status: 'open'
        });
        return docRef.id;
    } catch (e) {
        throw e;
    }
};

export default db;
