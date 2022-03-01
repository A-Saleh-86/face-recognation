import React from 'react';
import './FaceRecognation.css';

const FaceRecognation = ({ imgURL , box}) => {
    return (
        <div className='center ma'>
            <div className='absloute relative mt2'>
                <img id='imageValue' alt='' src={imgURL} width='500px' heigh='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
);
}

export default FaceRecognation;