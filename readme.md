# Combinations and permutations

This is a simple and naive approach to find all possible permutations in all available combinations of a given string.  
The rule is simple - each letter of a given string should be used in all available places with all available combinations.
```
A B C D = 64
--------
4*3*2*1 = 24
4*3*2   = 24
4*3     = 12
4       = 4

```
  
We have two versions a.js and b.js. They should be run via cli passing your input string.

## a.js
``` $ node a.js 'abcd' ```   
This goes throught all available iterations and outputs everything it generates in to output.txt file. This apporach is not fast and it has limitations like JavaScript heap out of memory when string is longer than 13 characters. In the end it takes some time to write everything to the file.

## b.js
``` $ node b.js 'abcd' 3 ```   
This one has [wordlist](https://www.npmjs.com/package/wordlist-english) intergated. It stops imidiatly if available permutation was found in the word list. This also takes aditional parameter - desired word length.  
It is much slower than a.js since on each iteration it is checking wordlist if it is a real word.   
This is an example of non recommended solution from performance wise.
