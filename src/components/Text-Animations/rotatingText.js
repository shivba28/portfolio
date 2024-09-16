import React, { useState, useEffect } from 'react';
import '../../assets/CSS/text.css';

export const TextRotate = ({words}) => {

    //console.log(words);


    return(
        <div className='container-rotate'>
            <div className='text-1'>
                <p>I work with</p>
                &nbsp;
                <p>
                {words.map((word, index) =>(
                    <span key={index} className='word' id={'w-' + (index+1)}>{word}</span>
                ))}
                </p>
            </div>
        </div>
    );
}
