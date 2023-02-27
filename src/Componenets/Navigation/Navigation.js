import React  from 'react';
import 'tachyons';
import { getAuth, signOut } from 'firebase/auth';

const Navigation = ({onRouteChange, isSignedIn}) =>{

    const onSignOut = () =>{
        const auth = getAuth();
        signOut(auth).then(() => {
            onRouteChange('signout');
        }).catch((error) => {
            console.log(error);
        });
    }


        if(isSignedIn){
        return(
            <nav style={{display : 'flex', justifyContent: 'flex-end'}}>
            <p onClick={onSignOut} className='ma0 f3 link din black underline pa3 pointer'>Sign Out</p>
        </nav>
        )
        }else{
            return(
            <nav style={{display : 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='ma0 f3 link din black underline pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='ma0 f3 link din black underline pa3 pointer'>Register</p>
           </nav>
        )
    }
}

export default Navigation;