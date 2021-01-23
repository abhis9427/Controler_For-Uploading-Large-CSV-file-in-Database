const fs = require('fs');
const readline = require('readline');
const lineByLine = require('n-readlines');
const lineReader = require('line-reader');


async function resUpload(flag) {
    var logger = fs.createWriteStream('CSVfile.csv', {
        flags: 'a' // 'a' means appending (old data will be preserved)
      })
    var no=0;
    fs.readFile('lineNo.txt', 'utf8', function(error, data) {
        if (error) {
            console.log('Error:- ' + error);
            throw error;
        }
        no=data;
    });
  console.log('enterd asycnc2');

  var i=0
  lineReader.eachLine('/home/mohit/Documents/atlan/annual-enterprise-survey-2019-financial-year-provisional-csv.csv', function(line) {
    
    if(fs.existsSync('status.txt')){
      var status = fs.readFileSync('status.txt', 'utf-8');
      if(status == "PAUSE"){
        fs.writeFileSync('lineNo.txt', i);
        return false;
      }
    } 
    //console.log(i);
    if(i > no){
        logger.write(line + '\n');
        //console.log(line);
    }
    i++;
    
});
}
  

// receive message from master process
  process.on('message', async (message) => {
  const lineNumber = await resUpload(message.flag); 
   
// send response to master process
// process.send({ counter: lineNumber });
    }); 