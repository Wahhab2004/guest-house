import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from './firebaseConfig';

const firestore = getFirestore(app);

export async function retrieveData<T>(collectionName: string): Promise<T[]> {
    const snapshot = await getDocs(collection(firestore, collectionName));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as T[];
}


export async function retrieveDataById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
        const snapshot = await getDoc(doc(firestore, collectionName, id));
        if (!snapshot.exists()) {
            console.warn(`Document with ID ${id} not found in ${collectionName}`);
            return null; // Kembalikan null jika tidak ditemukan
        }
        return snapshot.data() as T;
    } catch (error) {
        console.error(`Error retrieving document ${id} from ${collectionName}:`, error);
        return null;
    }
}