import React, { useState, useEffect } from 'react';
import '../../assets/CSS/text.css';

export const TextRotate = ({words}) => {

    //console.log(words);


    return(
        <div className='container-rotate'>
            <h1>I work with&nbsp;
                <div className='text'>
                    {words.map((word, index) =>(
                        <span key={index} className='word' id={'w-' + (index+1)}>{word}</span>
                    ))}
                </div>
            </h1>
            
        </div>
    );
}
