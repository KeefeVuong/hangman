import { useState } from 'react';
import { gameStarted, word } from './Header';
import Popup from './Popup';

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

const Letters = ({ underScores, setUnderScores }) => {
    const [popupStatus, setPopupStatus] = useState(false);
    const [losePopup, setLosePopup] = useState(false);
    var [wrongCounter, setWrongCounter] = useState(6);

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
        if (gameStarted === true) {
            document.getElementById(letter).style.backgroundColor = "#808080"
            
            var correctLetter = false;
            const index = letters.indexOf(letter)
            if (index > -1) {
                letters.splice(index, 1)
            }
            
            console.log(word)
            console.log(letter.toLowerCase())
            console.log(underScores)
            
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter.toLowerCase()) {
                    underScores = setCharAt(underScores, i * 2, letter);
                    setUnderScores(underScores);
                    correctLetter = true;
                }
            }
            
            if (correctLetter !== true) {
                setWrongCounter(wrongCounter -= 1);
            }
            
            if (wrongCounter === 0) {
                toggleLosePopup();
            }
            if (underScores.indexOf("_") === -1) {
                togglePopup()
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