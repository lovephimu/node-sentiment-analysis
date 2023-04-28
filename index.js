const aiUrl = 'https://monkeylearn.com/sentiment-analysis-online/';
const userInput = process.argv.slice(2).join(' ');
console.log(userInput);

const formData = {
  textarea: userInput,
};

const response = await fetch(aiUrl, {
  method: 'POST',
  body: formData,
});

const responseText = await response.text();

console.log(responseText);
