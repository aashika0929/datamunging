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
	const fs = require('fs');
  let rl = require('readline').createInterface({
	input: fs.createReadStream('../inputdata/Indicators.csv'),
	terminal: false
});
let arr3 = [];
let rural1 = [0, 0, 0, 0, 0];
let urban1 = [0, 0, 0, 0, 0];
let country = ['INDIA', 'CHINA', 'NEPAL', 'PAKISTAN', 'BHUTAN'];
let temp;
rl.on('line', function(line)
{
	let arr1 = line.split(',');
	if(arr1[1] === 'IND' && arr1[3] === 'SP.RUR.TOTL')
	{
		rural1[0] = rural1[0] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'IND' && arr1[3] === 'SP.URB.TOTL')
	{
		urban1[0] = urban1[0] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'CHN' && arr1[3] === 'SP.RUR.TOTL')
	{
		rural1[1] = rural1[1] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'CHN' && arr1[3] === 'SP.URB.TOTL')
	{
		urban1[1] = urban1[1] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'NPL' && arr1[3] === 'SP.RUR.TOTL')
	{
		rural1[2] = rural1[2] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'NPL' && arr1[3] === 'SP.URB.TOTL')
	{
		urban1[2] = urban1[2] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'PAK' && arr1[3] === 'SP.RUR.TOTL')
	{
		rural1[3] = rural1[3] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'PAK' && arr1[3] === 'SP.URB.TOTL')
	{
		urban1[3] = urban1[3] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'BTN' && arr1[3] === 'SP.RUR.TOTL')
	{
		rural1[4] = rural1[4] + parseInt(arr1[5], 10);
	}
	if(arr1[1] === 'BTN' && arr1[3] === 'SP.URB.TOTL')
	{
		urban1[4] = urban1[4] + parseInt(arr1[5], 10);
	}
});
rl.on('close', function()
{
	for(let j = 0; j < country.length; j = j + 1)
	{
		arr3.push({country: country[j], rural: rural1[j], urban: urban1[j]});
	}
	for(let i = 0; i < arr3.length; i = i + 1)
	{
		for(let j = 0; j < arr3.length - 1; j = j + 1)
		{
			if(arr3[j].rural + arr3[j].urban < arr3[j + 1].rural + arr3[j + 1].urban)
			{
				temp = arr3[j];
				arr3[j] = arr3[j + 1];
				arr3[j + 1] = temp;
			}
		}
	}
	fs.writeFile('json_stackedbarchart.json', JSON.stringify(arr3));
});
return 'JSON written Successfully';
};
