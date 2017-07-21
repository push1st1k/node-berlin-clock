"use strict";

const lineSep = require('path').delimiter;

const COLORS = {
    RED: 'R',
    YELLOW: 'Y',
    EMPTY: 'O'
}

function run() {
    const timeStr = process.argv[2];

    if(!timeStr) {
        throw new Error("the time must be provided as param");
    }
    const parsedTime = _parseTime(timeStr);

    _display(parsedTime);
}

function _parseTime(str) {
    const parts = str.split(':');
    _validate(parts);

    //for some reason parts.map(parseInt) doesn't work properly
    return parts.map(i=>{return parseInt(i)});
}

function _validate(parts) {
    _validateValue(parseInt(parts[0]), 0, 24, 'hours');
    _validateValue(parseInt(parts[1]), 0, 60, 'minutes');
    _validateValue(parseInt(parts[2]), 0, 60, 'seconds');
}

function _validateValue(value, min, max, type) {
    if(!(value >= min && value <= max)) {
        console.error('%s must be in range [%s..%s]', type, min, max);
        throw new Error("invalid time");
    }
}

function _display(time) {
    _displaySeconds(time[2]);
    _displayHours(time[0]);
    _displayMinutes(time[1]);
}

function _displayHours(hours) {
    _displayRow(COLORS.RED, Math.floor(hours / 5), 4);
    _displayRow(COLORS.RED, hours % 5, 4);
}

function _displayMinutes(minutes) {
    _displayRow(null, Math.floor(minutes / 5), 11, (i)=>{
        return i % 3 == 2 ? COLORS.RED : COLORS.YELLOW;
    });
    _displayRow(COLORS.YELLOW, minutes % 5, 4);
}

function _displaySeconds(seconds) {
    _displayRow(COLORS.YELLOW, (seconds + 1) % 2 , 1);
}

function _displayRow(color, lampsCount, totalCount, fn) {
    let out = "";
    for (let i = 0; i < totalCount; i++) {
        out += (i < lampsCount) ? (color || fn(i)) : COLORS.EMPTY;
    }
    console.log(out);
}

run();