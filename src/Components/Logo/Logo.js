import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'


const Logo = () =>{
    return (
        <div className="ma4 mt0">
            <Tilt  className="br2 shadow-2" style={{ height: '150px',width:'150px' ,background:' linear-gradient(to right, rgb(220, 24, 158), rgb(0, 135, 168))'}}>
                <div>
                    <h1><img style={{paddingTop:'10px'}} alt='logo' src={brain} /></h1>
                </div>
        </Tilt>
      </div>
    )
}

export default Logo;