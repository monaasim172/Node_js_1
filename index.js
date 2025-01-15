let express = require('express');
const bcrypt = require('bcrypt');
let fs = require('fs');
let DB = fs.readFileSync('./products.json', 'utf8')

DB = JSON.parse(DB);
DB.forEach(element => {
    console.log(element.id);
});

let app = express();
app.use(express.json());
app.get('/welcome/:username', function (req, res) {
    console.log('Done');
    res.send(`welcome ${req.params.username}`);
})

app.post('/login', function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        req.body.password = hash;
        console.log('gg');
        console.log(req.body.password);

        console.log(req.body);
        res.send("ok");
    })
})

app.post('/products', function (req, res) {
    console.log(req.body);
    DB.push(req.body);
    console.log(DB);
    res.send("Data added successfully");
})
app.get('/products/:id', function (req, res) {
    const id = req.params.id;
    console.log(DB[id-1]);
    res.send(`welcome product ${id}`);
})
app.delete('/products/:index', function (req, res) {
    let i = req.params.index;
    DB.splice(i - 1, 1);
    res.send('DB is spliced successfully');
    console.log(DB);   
})

app.patch("/products/:index", function (req, res) {
    let index = req.params.index;
    DB[index - 1].name = req.body.name;
    res.send("product is updated");
    console.log(DB);
})


app.listen(5050, function () {
    console.log("server is listen");
})