
const { fork } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const express = require('express');
const router =express.Router();
var flag = true;

router.get('/',(req, res) => {
    res.send('we are home post')
    
});

router.post('/upload',(req, res) => {
    res.send('we are home post')

    // fork another process
    const process = fork('/home/mohit/Documents/atlan/routes/upload.js');

    // send to forked process
    process.send({flag});
    // listen for messages from forked process
    // process.on('message', (message) => {
    //   console.log(`Number of mails sent ${message.counter}`);
    // });
    //return response.json({ status: true, sent: true });

});


router.get('/pause',(req, res) => {
    res.send('PAUSED')
    console.log(".....................................");   
    fs.writeFileSync('status.txt', "PAUSE"); 
    

});

router.get('/resume',(req, res) => {


    res.send('RESUMED')
    const path = './status.txt'

    try {
        fs.unlinkSync(path)
          //file removed
        } catch(err) {
            console.error(err)
            }


    const process = fork('/home/mohit/Documents/atlan/routes/resUpload.js');
    process.send({flag});
    
});

router.get('/terminate',(req, res) => {
    res.send('TERMINATED')

    fs.writeFileSync('status.txt', "PAUSE"); 
    const path = './status.txt'
    const path2= './lineNo.txt'
    const path3= './CSVfile.csv'

try {
  fs.unlinkSync(path)
  fs.unlinkSync(path2)
  fs.unlinkSync(path3)
  //file removed
} catch(err) {
  console.error(err)
}

});

module.exports = router;