import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from "../firebase/config";

const useFirestore = (collectionName) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        // Get a Firestore instance
        // Reference to the collection
        const q = query(collection(projectFirestore, collectionName), orderBy('createdAt', 'desc'));

        // Subscribe to the query
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = [];
            snapshot.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });
            setDocs(documents);
        });

        // Unsubscribe from the query when component unmounts
        return () => unsubscribe();

    }, [collectionName]);

    return { docs };
};

export default useFirestore;