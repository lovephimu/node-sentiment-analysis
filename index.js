// LIBRARIES VARIABLES INPUT

import fs from 'node:fs';
import { Configuration, OpenAIApi } from 'openai';
import { createInterface } from 'readline';
import apiAiKey from './apikey.js';

const apiKey = apiAiKey || undefined;
const userInput = process.argv.slice(2).join(' ');
console.log(userInput);
const missionStatementOne = 'Analyze the following input for sentiment value: ';
const missionStatementTwo =
  ' - first tell me if this text is more positive, negative or neutral. Secondly list the emotions and their percentage. Each list item should include the corresponding name of the emotions and an emoji that can be read in vs code terminal.';

const colorStart = `\x1b[38;2;0;255;127m`;
const colorEnd = `\x1b[0m`;
// FUNCTIONS

// User Input functions
// - set up write / read Interface

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// - set up input output mechanics based on promise - waits until user input is written

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readline.question(msg, (userRes) => {
      resolve(userRes);
    });
  });
};

// - over all interface with specific question and confirmation

const startApp = async () => {
  const userRes = await readLineAsync(
    colorStart +
      'What would you like me to run through a sentiment analysis? \n' +
      colorEnd,
  );
  readline.close();
  console.log(
    '\nYour response was: ' +
      userRes +
      ' — Thanks! Please wait a moment for the AI to analyze it\n',
  );
  return userRes;
};

// PROGRAM ON RUNTIME

// Welcome Message + Input

console.log(
  colorStart +
    `
##############################
##############################
##############################
#####                    #####
##### SENTIMENT-ANALYSIS #####
#####                    #####
##############################
##############################
##############################
` +
    colorEnd,
);

if (!apiKey) {
  console.log('API Key not defined - please contact developer');
}

console.log(
  colorStart +
    `
Hello, please input a word or text through command line! (Alternatively use a sample text file by typing SAMPLE)` +
    colorEnd +
    `
Also if you are reviewing this: please note that this isn't working online since I cannot upload my openAi API key.
Just ask me and I'll show you the functionality\n`,
);

let msgToAi = await startApp();

if (msgToAi === 'SAMPLE') {
  fs.readFile('./text.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(0);
    }
    msgToAi = data;
  });
}

// openAi communication

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `${missionStatementOne}${msgToAi}${missionStatementTwo}`,
  max_tokens: 70,
  temperature: 0,
});

console.log(response.data.choices[0].text);
