import React, { useState, useEffect } from 'react';
import '../../assets/CSS/text.css';

export const TextRotate = ({words}) => {
    
    return(
        <div className='container-rotate'>
            <div className='text-1'>
                <p style={{marginRight: 20}}>I work with</p>
                <p>
                    <span className="word letter in">{words}</span>
                </p>
            </div>
        </div>
    );
}
