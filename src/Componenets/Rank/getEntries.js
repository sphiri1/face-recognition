import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import { db } from "../../firebase";



export const getEntries = async (data) => {
    const docSnap = await getDocs(db);
    docSnap.forEach((querySnapshot) => {
        const user = getAuth().currentUser;
        if(querySnapshot.id === user.uid){
        data(querySnapshot.data().entries);
        }
    })
}

