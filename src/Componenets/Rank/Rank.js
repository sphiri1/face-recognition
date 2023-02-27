import React from "react";
import { getAuth } from "firebase/auth";
import { getDocs, updateDoc, doc } from "firebase/firestore";
import { db , firestore} from "../../firebase";
import { useState, useEffect } from "react";


const Rank =  ({ entry }) =>{
    const auth = getAuth();
    const name = auth.currentUser ? auth.currentUser.displayName : "Not signed in";
    const [entries, setEntries] = useState(0);
    const [id, setId] = useState('');

    useEffect(()=>{
        const getEntries = async () => {
            const docSnap = await getDocs(db);
            docSnap.forEach((querySnapshot) => {
                setEntries(querySnapshot.data().entries);
                setId(querySnapshot.id);
            });
        }
        
        const addEntry = async () => {
            const entriesRef = doc(firestore, "users", id);
            if(entry > 0){
                let counter = entries + 1;
            await updateDoc(entriesRef, {
              'entries': counter
            })
            getEntries();
        }
    }
        getEntries();
        addEntry();
    }, [entry])

   

    return(
        <div>
        <div className="white f3">
                {`${name}, your current number of entries is...`}
        </div>
        <div className="white f1">
                 {`#${entries}`}
        </div>
        </div>

    )
}

export default Rank;