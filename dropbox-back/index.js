const express = require('express')
var cors = require('cors')
const app = express();
var fs = require("fs");
const port = 8000;

app.use(cors())

let dir = 'dropbox/'
let contents

app.get('/', (req, res) => {
    contents = []
    fs.readdirSync(dir).forEach(file => {
        contents.push(file)
    });
    res.send(contents)
});
app.get('/getContents', (req, res) => {
    contents = []
    fs.readdirSync(dir).forEach(file => {
        contents.push(file)
    });
    res.send(contents)
});

app.get('/createContent/:contentType/:contentName', (req, res) => {
    if (req.params.contentType === '1') {
        fs.writeFile(dir + req.params.contentName)
    } else if (req.params.contentType === '2') {
        fs.mkdirSync(process.cwd() + '/' + dir + req.params.contentName)
    }
    res.send()
});
app.get('/removeContent/:contentName', (req, res) => {
    let contentPath = process.cwd() + '/' + dir + req.params.contentName
    fs.lstat(contentPath, (err, stats) => {
        if (stats.isFile()) {
            fs.unlink(contentPath)
        }
        if (stats.isDirectory()) {
            fs.rmdir(contentPath)
        }
    });
    res.send()
});
app.get('/updateContent/:contentName/:newContentName', (req, res) => {
    let contentPath = process.cwd() + '/' + dir + req.params.contentName
    let newContentPath = process.cwd() + '/' + dir + req.params.newContentName
    fs.lstat(contentPath, (err, stats) => {
        if (stats.isFile()) {
            fs.rename(contentPath, newContentPath, (err) => {
                if (err) throw err;
            });
        }
        if (stats.isDirectory()) {
            fs.rename(contentPath, newContentPath, (err) => {
                if (err) throw err;
            });
        }
    });
    res.send()
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});