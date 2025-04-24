import { collection, doc, getDoc, getDocs, getFirestore,  setDoc, updateDoc, deleteDoc } from "firebase/firestore";

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

export async function saveData<T>(collectionName: string, data: T & { id: string }): Promise<void> {
    try {
        const ref = doc(firestore, collectionName, data.id); // 1️⃣ Dapatkan referensi dokumen
        await setDoc(ref, data); // 2️⃣ Simpan data ke Firestore
        console.log(`Data saved to ${collectionName} with ID ${data.id}`);
    } catch (error) {
        console.error(`Error saving data to ${collectionName}:`, error);
        throw error; // lempar error agar bisa ditangani di tempat lain
    }
}



export async function updateData<T>(collectionName: string, id: string, updatedFields: Partial<T>): Promise<void> {
    try {
        const ref = doc(firestore, collectionName, id); // 1️⃣ Dapatkan referensi dokumen
        await updateDoc(ref, updatedFields); // 2️⃣ Update hanya field tertentu
        console.log(`Data with ID ${id} in ${collectionName} updated successfully`);
    } catch (error) {
        console.error(`Error updating document ${id} in ${collectionName}:`, error);
        throw error;
    }
}


export async function deleteData(collectionName: string, id: string): Promise<void> {
    try {
        const ref = doc(firestore, collectionName, id); // 1️⃣ Ambil referensi dokumen berdasarkan ID
        await deleteDoc(ref); // 2️⃣ Hapus dokumen dari koleksi
        console.log(`Data with ID ${id} in ${collectionName} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting document ${id} from ${collectionName}:`, error);
        throw error;
    }
}
