import React from 'react'
import words from './Words';

var word_array;
const Words = () => {
    fetch(words)
    .then((r) => r.text())
    .then(text  => {
        word_array = text.split(',');
        console.log(word_array)
    })  
    
    return (
        <div>Words</div>
    )
}

export default Words