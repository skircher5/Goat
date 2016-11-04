/**
 * @author Kircher, Everett (Everettkircher@icloud.com)
 * @version 0.0.1
 * @summary hello world // Created 09.15.16
 * @todo
 */


"use strict";
const PROMPT = require('readline-sync');

let title = [], rating = [], movies = [];
let continueResponse, whichPopulate, numNames;
let movie = {};

function main() {
    const SD_ARRAY = 0,
        MD_ARRAY = 1;
    process.stdout.write('\x1Bc'); //Clears the screen
    setContinueResponse();
    while (continueResponse === 1) {
        setWhichPopulate();
        if (whichPopulate === SD_ARRAY) {
            setNumNames();
            for (let i = 0; i < numNames; i++) {
                populateLastNames(i);
                populateFirstNames(i);
                process.stdout.write('\x1Bc'); //Clears the screen
            }
        } else if (whichPopulate === MD_ARRAY) {
            populatePeople();
        } else {
            populatePersonsMap();
        }
        setContinueResponse();
    }
    if (whichPopulate === 0) {
        printParallelArrays();
    } else if (whichPopulate === 1) {
        printPeople();
    } else {
        printPersons();
    }
    printGoodbye();
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function setWhichPopulate() {
    while (typeof whichPopulate === 'undefined' || isNaN(whichPopulate) || whichPopulate < 0 || whichPopulate > 2) {
        whichPopulate = Number(PROMPT.question(`\nWhich collection do you wish to use? [0=SD Array, 1=MD Array, 2=Map]: `));
    }
}

function setNumNames() {
    while (typeof numNames === 'undefined' || isNaN(numNames) || numNames < 1) {
        numNames = Number(PROMPT.question(`\nHow many movies to enter?: `));
    }
}

function populateLastNames(index) {
    while (typeof title[index] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(title[index])) {
        title[index] = PROMPT.question(`Please enter title: `);
    }
}

function populateFirstNames(index) {
    while (typeof rating[index] === 'undefined' || isNaN(rating[index]) || rating[index] < 0 || rating[index] > 5) {
        rating[index] = PROMPT.question(`Please enter rating: `);
    }
}

function populatePeople() {
    const COLUMNS = 3;
    let numPeople = 0;
    while (isNaN(numPeople) || numPeople < 1) {
        numPeople = Number(PROMPT.question(`\nHow many movies: `));
    }
    process.stdout.write('\x1Bc'); //Clears the screen
    for (let i = 0; i < numPeople; i++) {
        movies[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof movies[i][j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(movies[i][j])) {
                    movies[i][j] = PROMPT.question(`Please enter title: `);
                }
            } else {
                while(typeof movies[i][j] === 'undefined' || isNaN(movies[i][j]) || movies[i][j] < 0 || movies[i][j] > 5) {
                    movies[i][j] = Number(PROMPT.question(`Please enter rating: `));
                }
            }
        }
        process.stdout.write('\x1Bc'); //Clears the screen
    }
}

function populatePersonsMap() {
    movies = {'movie': []};
    const COLUMNS = 3;
    let numPersons = 0;
    while (isNaN(numPersons) || numPersons < 1) {
        numPersons = Number(PROMPT.question(`\nHow many movies to enter: `));
    }
    process.stdout.write('\x1Bc'); //Clears the screen
    for (let i = 0; i < numPersons; i++) {
        let movie = [];
        for (let j = 0; j < COLUMNS; j++) {
            if (j === 0) {
                while (typeof movie[j] === 'undefined' || !/(^[a-z]+$){1,30}/i.test(movie[j])) {
                    movie[j] = PROMPT.question(`Please enter title: `);
                    movies.movie.push({'title': movie[j]});
                }
            } else if (j === 1) {
                while (typeof movie[j] === 'undefined' || isNaN(movie[i][j]) || movie[i][j] < 0 || movie[i][j] > 5) {
                    movie[j] = PROMPT.question(`Please enter rating: `);
                    movies.movie.push({'rating': movie[j]});
                }
            }
        }
        process.stdout.write('\x1Bc'); //Clears the screen
    }
}

function printParallelArrays() {
    for (let i = 0; i < title.length; i++) {
        console.log(`${title[i]}, ${rating[i]}`);
    }
}

function printPeople() {
    const COLUMNS = 3;
    for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(movies[i][j]);
        }
    }
}

function printPersons() {
    console.log(movies);
    console.log(JSON.stringify(movies, null, "   "));
    for (let i = 0; i < movies.person.length; i++) {
        console.log(movies.movie[i]);
        console.log(`Last Name: ${movies.movie[i].title}, First Name: ${movies.movie[i].rating}`);
    }
}

function printGoodbye() {
    console.log(`\tGoodbye.`);
}

