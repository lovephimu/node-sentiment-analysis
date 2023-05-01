// LIBRARIES VARIABLES INPUT
import { Configuration, OpenAIApi } from 'openai';
import { createInterface } from 'readline';
import apiAiKey from './apikey.js';

const apiKey = apiAiKey;
const aiUrl = 'https://monkeylearn.com/sentiment-analysis-online/';
const userInput = process.argv.slice(2).join(' ');
console.log(userInput);
const missionStatementOne = 'Analyze the following input for sentiment value: ';
const missionStatementTwo =
  ' - first tell me if this text is more positive, negative or neutral. Secondly list the emotions and their percentage. Each list item should include the corresponding name of the emotions and an emoji that can be read in vs code terminal.';

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
    'What would you like me to run through a sentiment analysis? \n',
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

console.log(`
Hello, please input a word or text through command line! (Alternatively upload a text file by typing UPLOAD)
Also if you are reviewing this: please note that this isn't working online since I cannot upload my openAi API key.
Just ask me and I'll show you the functionality\n`);

const msgToAi = await startApp();

if (msgToAi === 'UPLOAD') {
  console.log('Sorry still under construction');
  process.exit(0);
}

// openAi communication

const configuration = new Configuration({
  apiKey: apiAiKey,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: `${missionStatementOne}${msgToAi}${missionStatementTwo}`,
  max_tokens: 70,
  temperature: 0,
});

console.log(response.data.choices[0].text);
