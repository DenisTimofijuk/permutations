const cliProgress = require('cli-progress');
fs = require('fs');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
let progress = 0
const string = process.argv[2];
const eta = getEstimations(string.split('').length);
const stream = fs.createWriteStream("output.txt", {flags:'a'});
fs.writeFile('output.txt', '', function(){
    bar1.start(eta, progress);
    spinAll(string, '')
    bar1.stop();
    stream.end();
    console.log('Finished.')
})

function spinAll(inputString, prefix) {
    const letters = inputString.split('');
    for(let index = 0; index < letters.length; index++){
        const buffer = [].concat(letters);
        const letter = letters[index];
        const result = prefix + letter;
        buffer.splice(index, 1);
        stream.write(result + "\n");
        progress++
        bar1.update(progress);
        spinAll(buffer.join(''), result);
    }
}

function rFact(num, limit) {
    if (num === 0 || num === limit) {
        return 1;
    } else {
        return num * rFact(num - 1, limit);
    }
}

function getEstimations(numb) {
    let i= 0;
    let result = 0;
    while (i < numb) {
        result += rFact(numb, i);
        i++;
    }

    return result;
}