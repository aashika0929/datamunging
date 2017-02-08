/* creating a interface to read the file */
module.exports = function(convert)
{
	if(!convert)
	{
		throw Error('Not a number');
	}
	if(typeof convert !== 'number')
	{
		throw Error('Not a number');
	}
	let read = require('fs');
	let lineReader = require('readline').createInterface({
		input: read.createReadStream('../inputdata/Indicators.csv')
	});

	/* insializing variables */
	let jsonArray = [];
	let heading = [];
	let row = 0;
	let count = 0;
	/* Reading the data from the csv file */
	lineReader.on('line', function (line)
	{
		if(row === 0)
		{
			heading = line.split(',');
			row = row + 1;
		}
		else
		{
			let jsonObj = {};
			let currentLineData = line.split(',');
			// console.log(currentLineData);
			for (let j = 0; j < heading.length; j = j + 1)
			{
			if(heading[j] === 'Year')
			{
				if(currentLineData[j - 3] === 'IND' && currentLineData[j - 1] === 'SP.URB.GROW')
				{
					jsonObj[heading[j]] = currentLineData[j];
					count = 1;
				}
				else
				{
					count = 0;
				}
			}
			if(heading[j] === 'Value')
			{
				if(currentLineData[j - 4] === 'IND' && currentLineData[j - 2] === 'SP.URB.GROW')
				{
					jsonObj[heading[j]] = currentLineData[j];
					count = 1;
				}
				else
				{
					count = 0;
				}
			}
		}
			if(count === 1)
			{
				jsonArray.push(jsonObj);
			}
}
	});
	/* Appending the data into output file */
	lineReader.on('close', function()
	{
		read.writeFile('json_areachart.json', JSON.stringify(jsonArray));
	});
return 'JSON written Successfully';
};
