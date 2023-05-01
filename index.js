// LIBRARIES VARIABLES INPUT
import { createInterface } from 'readline';
import apiAiKey from './apiKey.js';

const apiKey = apiAiKey;
const aiUrl = 'https://monkeylearn.com/sentiment-analysis-online/';
const userInput = process.argv.slice(2).join(' ');
console.log(userInput);

// FUNCTIONS

// User Input functions

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

const startApp = async () => {
  const userRes = await readLineAsync(
    'What would you like me to run through a sentiment analysis? \n',
  );
  readline.close();
  console.log(
    'Your response was: ' +
      userRes +
      ' — Thanks! Please wait a moment for the AI to analyze it',
  );
  return userRes;
};

// PROGRAM ON RUNTIME

// Welcome Message + Input

console.log(`
##############################
##############################
##############################
#####                    #####
##### SENTIMENT-ANALYSIS #####
#####                    #####
##############################
##############################
##############################
`);

console.log(`Hello, please input a word or text through command line! \n`);

const msgToAi = await startApp();
console.log(msgToAi);
