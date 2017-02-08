module.exports = function(convert) {
    if(!convert) {
        throw Error('Not a number');
    }
    if(typeof convert !== 'number') {
        throw Error('Not a number');
  }
let read = require('fs');
let lineReader = require('readline').createInterface({
        input: read.createReadStream('../inputdata/Indicators.csv')
    });
    let jsonArray = [];
    let heading = [];
    let row = 0;
    let count = 0;
    lineReader.on('line', function (line) {
        if(row === 0) {
            heading = line.split(',');
            row = row + 1;
        }
        else {
            let jsonObj = {};
            let currentLineData = line.split(',');
            for (let j = 0; j < heading.length; j = j + 1) {
                if(heading[j] === 'Year') {
                    if(currentLineData[j - 3] === 'IND'
                        && (currentLineData[j - 1] === 'SP.URB.TOTL.IN.ZS'
                        || currentLineData[j - 1] === 'SP.RUR.TOTL.ZS')) {
                        jsonObj[heading[j]] = currentLineData[j];
                        count = 1;
                    }
                    else {
                        count = 0;
                    }
                }
                if(heading[j] === 'Value') {
                    if(currentLineData[j - 4] === 'IND'
                        && (currentLineData[j - 2] === 'SP.URB.TOTL.IN.ZS'
                        || currentLineData[j - 2] === 'SP.RUR.TOTL.ZS')) {
                        jsonObj[heading[j]] = currentLineData[j];
                        count = 1;
                    }
                    else {
                        count = 0;
                    }
                }
            }
            if(count === 1) {
                jsonArray.push(jsonObj);
            }
        }
    });
    lineReader.on('close', function() {
        read.writeFile('json_multilinechart.json', JSON.stringify(jsonArray));
    });
    return 'JSON written Successfully';
};
