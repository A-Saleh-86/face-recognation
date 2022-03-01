import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm =({onInputChange , onButtonChange})=>{
    return(
        <div >
            <div>
                <p className='f3'>
                    {'This Magis Brain Will Detect Faces In Your Photos..'}
                </p>
            </div>
            <div className="center">
            <div className="form center pa4 br3 shadow-5 ">
                <input onChange={onInputChange}  className="f4 pa2 w-70 center" type='text' />
                <button 
                className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                onClick={onButtonChange}>
                Detect</button>
            </div>
               </div>
            
        </div>
    )
}

export default ImageLinkForm;