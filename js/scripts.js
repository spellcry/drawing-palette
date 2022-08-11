// variabili di stato
let colorSelectedEl;

// dichiarazione variabili
let xValue, yValue, cellaBgColor = 'black';

// inizializzazione array colori
const arrayColors = [
    '#eee',
    '#000',
    '#fff',
    '#fc9c9b',
    '#ed3c3d',
    '#b11b1a',
    '#feb16a',
    '#f86716',
    '#bb3910',
    '#fccd44',
    '#f3940d',
    '#ab480d',
    '#fddb3e',
    '#e7aa0c',
    '#97570b',
    '#b6ef59',
    '#7ac517',
    '#447211',
    '#7ceda3',
    '#1fbd53',
    '#157535',
    '#63e3af',
    '#11b176',
    '#086d4d',
    '#54e7ce',
    '#14af9c',
    '#106b63',
    '#5ce5f9',
    '#0aadce',
    '#106985',
    '#72ccfc',
    '#0f9be6',
    '#065f97',
    '#88bdfd',
    '#3477f5',
    '#1b45d2',
    '#9baafc',
    '#585bef',
    '#3a31c3',
    '#bcacfd',
    '#8051f5',
    '#6325d4',
    '#d2abfe',
    '#9e4af5',
    '#731fc7',
    '#eea1fb',
    '#d53eec',
    '#981aa6',
    '#f89ece',
    '#e93f8d',
    '#b51754',
    '#fc99a5',
    '#f23752',
    '#b61435',
];

// creazione variabile che contiene l'elemento grid
const gridEl = document.querySelector('.grid');
gridEl.addEventListener('click', drawHandler);
gridEl.addEventListener('mousedown', addMouseMoveHandler);
gridEl.addEventListener('mouseup', removeMouseMoveHandler);

// creazione variabile che contiene l'elemento reset
const resetEl = document.querySelector('.reset');
resetEl.addEventListener('click', resetClickHandler);

// creazione variabile che contiene l'elemento colors
const colorsEl = document.querySelector('.colors');
colorsEl.addEventListener('click', colorsClickHandler);
for ( let i = 0; i < 54; i++ ) {
    const colorEl = document.createElement('div');
    colorEl.className = 'color';
    switch (arrayColors[i]) {
        case '#fff':
            colorEl.classList.add('white');
            break;
        case '#eee':
            colorEl.classList.add('gomma');
            break;
        case '#000':
            colorEl.classList.add('selected');
            colorSelectedEl = colorEl;
            break;
    }
    colorEl.style.backgroundColor = arrayColors[i];
    colorsEl.append(colorEl);
}

// funzione che gestisce il click su reset
function resetClickHandler() {
    const xEl = document.querySelector('.x');
    const yEl = document.querySelector('.y');
    
    xValue = parseInt(xEl.value.trim());
    yValue = parseInt(yEl.value.trim());

    if ( !isNaN(xValue) && !isNaN(yValue) ) {
        gridEl.style.gridTemplateColumns = `repeat(${xValue}, 1fr)`;
        gridEl.innerHTML = '';
        const totCelle = xValue * yValue;
        for ( let i = 0; i < totCelle; i++ ) {
            const cellaEl = document.createElement('div');
            cellaEl.className = 'cella';
            if ( ( i + 1) % xValue === 0 )
                cellaEl.classList.add('br-0');
            if ( Math.ceil(( i + 1 ) / xValue) === yValue )
                cellaEl.classList.add('bb-0');
            gridEl.append(cellaEl);
            gridEl.classList.add('border');
        }
    } else {
        xValue = 0;
        yValue = 0;
    }
    if ( xValue === 0 || yValue === 0 ) {
        gridEl.classList.remove('border');
        gridEl.innerHTML = '';
    }
}

// funzione che aggiunge un eventlistener 'mouvemove'
function addMouseMoveHandler() {
    gridEl.addEventListener('mousemove', drawHandler);
}

// funzione che elimina un eventlistener 'mousemouve'
function removeMouseMoveHandler() {
    gridEl.removeEventListener('mousemove', drawHandler);
}

// funzione che colora la cella
function drawHandler() {
    const hoverEl = this.querySelector(':hover');
    hoverEl.style.backgroundColor = cellaBgColor;
    switch (cellaBgColor) {
        // se il colore selezionato è rgb(238, 238, 238) cioè #eee, cioè la gomma
        // setto il bordo del colore originale della griglia
        case 'rgb(238, 238, 238)':
            hoverEl.style.borderColor = '#ddd';
            break;
        default:
            hoverEl.style.borderColor = cellaBgColor;
            break;
    }
}

// funzione che gestisce il click sui colori
function colorsClickHandler() {
    const colorEl = this.querySelector(':hover');
    if ( colorEl.className !== 'colors' ) {
        if ( colorSelectedEl !== undefined ) {
            colorSelectedEl.classList.remove('selected');
        }
        colorSelectedEl = colorEl;
        cellaBgColor = colorSelectedEl.style.backgroundColor;
        colorEl.classList.add('selected');
    }
}