const wordlist = require('wordlist-english');
const cliProgress = require('cli-progress');
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const string = process.argv[2];
const searchableWordLength = process.argv[3];
const eta = getEstimations(string.split('').length);
const permutations = [];
const availableEnglishWords = [];
const englishWords = wordlist['english'];

(async ()=>{
    console.log('Total available permutations for [', string, '] is: ', eta);
    bar1.start(eta, 0);
    await spinAll(string, '');
    bar1.stop();
    if(availableEnglishWords.length > 0){
        console.log('Found available word:');
        console.log(availableEnglishWords.join('\n'));
    }else{
        console.log('No english words found.');
    }
    
    console.log("Total processed: ", permutations.length);
    // console.log(permutations.join('\n'));
})()



async function spinAll(inputString, prefix) {
    const letters = inputString.split('');
    for(let index = 0; index < letters.length; index++){
        if(availableEnglishWords.length > 0){
            return;
        }
        const buffer = [].concat(letters);
        const letter = letters[index];
        const result = prefix + letter;
        buffer.splice(index, 1);
        permutations.push(result);
        bar1.update(permutations.length);
        if( result.length >= searchableWordLength && englishWords.indexOf(result) > -1){
            availableEnglishWords.push(result);
        }else{
            await timeout(10);
            await spinAll(buffer.join(''), result);
        }        
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