import { useState } from 'react';
import { gameStarted, word } from './Header';
import Popup from './Popup';
import pic1 from './pics/1.png';
import pic2 from './pics/2.png';
import pic3 from './pics/3.png';
import pic4 from './pics/4.png';
import pic5 from './pics/5.png';
import pic6 from './pics/6.png';

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

var usedLetters = []
var currentPic = pic1

const Letters = ({ underScores, setUnderScores }) => {
    const [popupStatus, setPopupStatus] = useState(false);
    const [losePopup, setLosePopup] = useState(false);
    var [wrongCounter, setWrongCounter] = useState(5);
    var [gameState, setGameState] = useState(false);

    const toggleLosePopup = () => {
        setLosePopup(!losePopup);
    }

    const togglePopup = () => {
        setPopupStatus(!popupStatus);
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    function clickLetters(letter) {
        if (gameStarted === true && gameState === false) {
            document.getElementById(letter).style.backgroundColor = "#808080"
            
            var correctLetter = false;
            const index = letters.indexOf(letter)
            const usedIndex = usedLetters.indexOf(letter)
            if (usedIndex === -1) {
                if (index !== -1) {
                    letters.splice(index, 1)
                }
                
                usedLetters.push(letter)
                
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === letter.toLowerCase()) {
                        underScores = setCharAt(underScores, i * 2, letter);
                        setUnderScores(underScores);
                        correctLetter = true;
                    }
                }
                
                if (correctLetter !== true) {
                    setWrongCounter(wrongCounter -= 1);
                    if (wrongCounter === 5) {
                        currentPic = pic1
                    }
                    else if (wrongCounter === 4) {
                        currentPic = pic2
                    }
                    else if (wrongCounter === 3) {
                        currentPic = pic3
                    }
                    else if (wrongCounter === 2) {
                        currentPic = pic4
                    }
                    else if (wrongCounter === 1) {
                        currentPic = pic5
                    }
                    else if (wrongCounter === 0) {
                        currentPic = pic6
                    }
                }
                
                if (wrongCounter === 0) {
                    setGameState(gameState = true)
                    toggleLosePopup();
                }
    
                if (underScores.indexOf("_") === -1) {
                    setGameState(gameState = true)
                    togglePopup()
                }
            }
        }
    }

    function makeLetters(letter) {
        return (
            <button id={letter} style={{height: '35px', width : '50px'}} onClick={() => clickLetters(letter)}>
                {letter}
            </button>
        )
    }
    return (
    <div>
        {letters.map(makeLetters, this)}
        <h1>You have {wrongCounter} lives left.</h1>
        <img src={currentPic} alt="hangman" width="130" height="170"></img>
        {popupStatus && <Popup
        content={<>
            <b>Congratulations!</b>
            <p>You have won!</p>
        </>}
        handleClose={togglePopup}
        />}
        {losePopup && <Popup
        content={<>
            <b>Unlucky!</b>
            <p>You have lost! The word was {word}.</p>
            <p>Please try again!</p>
        </>}
        handleClose={toggleLosePopup}
        />}
    </div>
    )
}

export default Letters