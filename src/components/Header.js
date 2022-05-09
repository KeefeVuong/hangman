import React, { useState } from 'react';
import words from './words.txt';
import Letters from "./Letters"

var gameStarted = null
export { gameStarted }

var word;
export { word }

const Header = ({title}) => {
  var [underScores, setUnderScores] = useState("");

  function generateWord() {
    var word_array
    fetch(words)
    .then((r) => r.text())
    .then(text  => {
        word_array = text.split(',');
        word = word_array[Math.floor(Math.random()*word_array.length)];
        for (let i = 0; i < word.length; i++) {
            if (i == word.length - 1) {
              setUnderScores(underScores += "_")
            }
            else {
              setUnderScores(underScores += "_ ")
            }
        }
    }) 
  }

  const onClick = () => {
    if (gameStarted === false) {
      document.getElementById("play").style.display = 'inline-block'
      window.location.reload();
    }
    else {
      gameStarted = true
      generateWord()
      document.getElementById("play").style.display = 'none'   
    }
  }

  const resetGame = () => {
    if (gameStarted === true) {
      gameStarted = false
      onClick()
    }
  }
  
  return (
    <header class='header'>
        <h1>{title}</h1>
        <button id="play" classname='button' onClick={onClick}>Click To Play</button>
        <button onClick={resetGame}>Reset</button>
        <h2 id="underscore" style={{"font-size": 30}}>{underScores}</h2>
        <Letters underScores = { underScores } setUnderScores = { setUnderScores }/>
    </header>
  )
}

export default Header