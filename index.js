const express = require("express")

const port = 7000;

const app = express();

app.use(express.urlencoded());

const db = require("./config/mongoose");

const crud = require("./model/database");
const { url } = require("inspector");

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    crud.find({}).then((bookdata) => {
        return res.render('form', {
            bookdata,
            single: ""
        });
    }).catch((err) => {
        if (err) {
            console.log(err);
            return res.redirect('back');
        }
    })
})

app.post('/insertdata', (req, res) => {
    const { editid, name, price, pages, author } = req.body;

    if (editid) {
        if (!name || !price || !pages || !author) {
            console.log("Enter All Data");
            return res.redirect('back');
        }
        crud.findByIdAndUpdate(editid, {
            name: name,
            price: price,
            pages: pages,
            author: author
        }).then((data)=>{
            console.log("Edit Successfull");
            return res.redirect('/');
        }).catch(err => console.log(err))
        return res.redirect('/');
    }
    else{
        if (!name || !price || !pages || !author) {
            console.log("Enter All Data");
            return res.redirect('back');
        }
        crud.create({
            name: name,
            price: price,
            pages: pages,
            author: author
        }).then((data) => {
            console.log("data insert Successfull");
            return res.redirect('back');
        }).catch(err => console.log(err))
        return res.redirect('back');
    }
})

app.get('/deletedata/:id', (req, res) => {
    let id = req.params.id;
    crud.findByIdAndDelete(id).then((data) => {
        console.log("Delete Successfull");
        return res.redirect('/');
    }).catch(err => console.log(err))
    return res.redirect('/');
})

app.get('/editdata/:id', async(req, res) => {
    let id = req.params.id;
    let alldata = await crud.find({});
    crud.findById(id).then((single) => {
        return res.render('form', {
            single,
            bookdata: alldata
        })
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("Server is Running On Port " + port);
})