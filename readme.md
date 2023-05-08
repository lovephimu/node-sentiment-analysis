# Node Sentiment Analysis (using openAI)

### working only locally (sorry, see the bottom note)

This sentiment analysis can judge whether the user input it positive, negative or any other kind of emotion!

## How to:

Run the script using

´´´
node index.js
´´´

Follow the instructions in the command line - also in order to give input you have to use the command line!

The code will take a moment to handle the transfer between servers. So please be patient!
Your input will be analyzed and categorized in emotional categories, accompanied by emojis (that's actually the best part).
Also the confidence within the input will be rated by the AI

## Behind the scenes:

The code is using a library by openAI in order to fetch the input properly. You input will be wrapped into the following two mission statements:

´´´
Analyze the following input for sentiment value:
´´´
´´´

- first tell me if this text is more positive, negative or neutral. Secondly list the emotions and their percentage. Each list item should include the corresponding name of the emotions and an emoji that can be read in vs code terminal. Also rate the confidence in the text.
  ´´´

Until now, this has returned same-looking results.

# THIS WILL ONLY WORK LOCALLY!!!

Unfortunately you cannot hardcode an openAI API key into the code thus the code will throw an error because it's trying to access a file which is listed on .gitignore.
However, the code is written with environmental variables. If you have an openAI API key coded into your local computer then this code should work!
