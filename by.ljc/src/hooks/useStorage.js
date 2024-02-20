import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { projectFirestore } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = ref(projectStorage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const collectionRef = collection(projectFirestore, "images");
        
        uploadTask.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);

        }, (err) => {
            setError(err);
        }, async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            const createdAt = serverTimestamp();
            try {
                // Add document to the collection
                await addDoc(collectionRef, {
                    url,
                    createdAt
                });
                setUrl(url);
            } catch (error) {
                setError(error);
            }
        });

        // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
        return () => {
            uploadTask.cancel(); // Cancel the upload task if the component unmounts
        };

    }, [file]);

    return { progress, url, error };
};

export default useStorage;