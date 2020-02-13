const request = require('request');
const https = require('https');
const fs = require('fs');
const userInput = process.argv.slice(2);


const fetcher = function() {


  request(`${userInput[0]}`, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (response.statusCode !== 200) {
      console.log(error);
    } else {
      fs.writeFile(`${userInput[1]}`, body, function (err) {
        if (err) {
          throw err;        
        }
      });
    }
  })

  .on('response', function(response) {
    response.on('data', function(data) {
      console.log(`Downloaded and saved ${data.length} bytes to ${userInput[1]}`);
    })
  })
}

fetcher();

