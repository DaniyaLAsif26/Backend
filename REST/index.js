const express = require("express")
const app = express()
const port = 8080
const path = require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname, "public")))

let quotes =[
    {
        quote :"Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
        name : "Steve Jobs",
        id : uuidv4()
    },
    {
        quote :"Many of life’s failures are people who did not realize how close they were to success when they gave up.",
        name : "Thomas A. Edison",
        id : uuidv4()
    },
    {
        quote :"If you want to live a happy life, tie it to a goal, not to people or things",
        name : "Albert Einstein",
        id : uuidv4()
    },
    {
        quote :"I can accept failure, everyone fails at something. But I can’t accept not trying.",
        name : "Michael Jordan",
        id : uuidv4()
    },

]

app.get("/posts",(req,res) =>{
    res.render("index.ejs",  {quotes})
})

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs")
})

app.post("/posts",(req,res) =>{
   let {name , quote} = req.body
   let id = uuidv4()
   quotes.push({name ,id, quote})
    res.redirect("/posts")
})

app.get("/posts/:id" , (req,res) =>{
    let {id} = req.params
    let post = quotes.find((p) => id === p.id)
    res.render("show.ejs" , {post})
})

app.get("/posts/:id/edit" , (req,res) =>{
    let {id} = req.params
    let post = quotes.find((p) => id === p.id)
    res.render("edit.ejs" , {post})
})

app.patch("/posts/:id" , (req,res) =>{
    let {id} = req.params
    let post = quotes.find((p) => id === p.id)
    let newName = req.body.name
    console.log(newName)
    let newQuote = req.body.quote
    post.name= newName
    post.quote = newQuote
    res.redirect("/posts")
})

app.delete("/posts/:id" , (req,res) =>{
    let {id} = req.params
    quotes = quotes.filter((p) => id !== p.id)
    res.redirect("/posts")
})

app.listen(port,() => {
    console.log("listening on port")
})
