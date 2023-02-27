import React from "react";
import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { firestore} from "../../firebase";
import { useState, useEffect } from "react";
import { getEntries } from "./getEntries";


const Rank =  ({ entry }) =>{
    const auth = getAuth();
    const name = auth.currentUser ? auth.currentUser.displayName : "Not signed in";
    const [entries, setEntries] = useState(0);

    useEffect(()=>{
        getEntries(setEntries);
        addEntry();
    }, [entry])

  

     const addEntry = async () => {
        const user = getAuth().currentUser;
        const entriesRef = doc(firestore, "users", user.uid);
        if(entry > 0){
           let counter = entries + 1;
        await updateDoc(entriesRef, {
          'entries': counter
        })
        getEntries(setEntries); 
      }
    }


        
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