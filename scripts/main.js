"use strict";

const difficultySelectorElement = document.getElementById("difficulty_selector");
const minefieldCreatorElement = document.getElementById("minefield_creator");
const minefieldElement = document.getElementById("minefield");

minefieldCreatorElement.addEventListener("click", clickMinefieldCreator);

/**
 * Starts program when "Play" button is clicked
 */
function clickMinefieldCreator() {

    const difficulty = parseInt(difficultySelectorElement.value);

    const createdMinefield = minefieldCreator(difficulty);

    minefieldOutput(minefieldElement, createdMinefield);

}












/**
 * Creates a single minefield cell and the click mechanism for good cells/mines
 * @param {string} cellContent Content of the created cell
 * @param {number} cellsPerRow How many cells on a single row
 * @param {[]} minesArray Mines as array of numbers
 * @returns {HTMLDivElement} Minefield cell
 */
function cellCreator (cellContent, cellsPerRow, minesArray) {

    const cell = document.createElement("div");

    cell.classList.add("cell");

    const cellsSingleRow = Math.sqrt(cellsPerRow);

    cell.style.flexBasis = `calc(100% / ${cellsSingleRow})`;

    cell.innerHTML = cellContent;

    cell.addEventListener("click", function() {

        for (let i = 0; i < minesArray.length; i++) {

            if (minesArray.indexOf(cellContent) === -1) {

                cell.classList.add("bg-info-subtle");
    
            } else {
    
                cell.classList.add("bg-danger");
    
            }

        }

    }
    )

    return cell;

}

/**
 * Creates mines in form of array of numbers
 * @param {number} cellsInMinefield 
 * @returns {[]} array of mines
 */
function minesCreator (cellsInMinefield) {

    const minesContainer = [];

    for (let i = 0; i < 16; i++) {

        let mine = Math.floor(Math.random() * cellsInMinefield + 1);

        if (minesContainer.indexOf(mine) === -1) {

            minesContainer.push(mine);

        } else {

            i--;

        }

    }
    
    return minesContainer;

}

/**
 * Creates minefiled
 * @param {number} difficultyArgument Number of cells to put in minefield
 * @returns {HTMLDivElement[]} Minefield as cells array
 */
function minefieldCreator (difficultyArgument) {

    const minefield = [];
    const arrayOfMines = minesCreator(difficultyArgument);

    for (let i = 0; i < difficultyArgument; i++) {

        const createdCell = cellCreator(i+1, difficultyArgument, arrayOfMines);

        minefield.push(createdCell);

    }

    return minefield;

}

/**
 * Adds minefield to Html
 * @param {HTMLDivElement} minefieldContainer 
 * @param {HTMLDivElement[]} cellList 
 */
function minefieldOutput(minefieldContainer, cellList) {

    for (let i = 0; i < cellList.length; i++) {

        minefieldContainer.append(cellList[i]);

    }

}