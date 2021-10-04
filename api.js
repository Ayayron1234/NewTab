const router = require("express").Router();
const fs = require("fs");

// list document names to client
router.get('/documents/', async (req, res, next) => {
    fs.readdir("./documents", (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Unable to get list of documents" });
        } else {
            res.status(200).send(files);
        }
    });
});

// send document to client
router.get('/documents/:docName', async (req, res, next) => {
    fs.readFile(`./documents/${req.params.docName}`, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data)
    })
});

// update document
router.post('/documents/:docName', async (req, res, next) => {
    fs.writeFile(`./documents/${req.params.docName}`, req.body.content, err => {
        if (err)
            console.log(err);
        console.log(`wrote data into ${req.params.docName}`);
    })
    res.status(200).send({ message: "file updated" });
});

module.exports = router;
