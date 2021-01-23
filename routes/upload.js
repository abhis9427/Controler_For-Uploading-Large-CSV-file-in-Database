const fs = require('fs');
const readline = require('readline');
const lineByLine = require('n-readlines');
const lineReader = require('line-reader');


async function upload(flag) {
  console.log('enterd asycnc');
  var logger = fs.createWriteStream('CSVfile.csv', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })

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
    i++;
    logger.write(line + '\n');
    //console.log(line);
});
}
  

// receive message from master process
  process.on('message', async (message) => {
  const lineNumber = await upload(message.flag); 
   
// send response to master process
// process.send({ counter: lineNumber });
    }); 