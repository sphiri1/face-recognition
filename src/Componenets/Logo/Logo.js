import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain2.png';

const Logo = () =>{
    return(
<div className='ma3 nt0'>
<Tilt className='Tilt' options={{max : 50}} style={{height: 100, width : 100}}>
    <div className='Tilt-inner pa3'>
    <img style={{paddingTop: '5px'}} alt='logo' src={brain}></img>
    </div>
</Tilt>
</div>
    )
}

export default Logo;