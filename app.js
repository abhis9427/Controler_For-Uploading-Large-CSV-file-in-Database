const express = require('express');
const app =express();

const postsRoutes = require('./routes/posts');

app.use('/posts',postsRoutes)

//Routes
app.get('/',(req,res) => {
    res.send('we are home')
});


//listner
app.listen(3000)