const express = require('express')
const nunjucks = require('nunjucks');
const app = express()

nunjucks.configure('views', {
    autoscape: true,
    express: app,
    watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')


const users = [
    'João',
    'Lucas',
    'Marcio'
]

const middValidation = (req, res, next) => {
  if(req.query.age){
    next()
  }else{
    return res.redirect('/')
  }
}

app.get('/', (req, res) =>{
    return res.render('home')
})

app.get('/new', (req, res) =>{
    return res.render('new')
})

app.post('/create', (req, res) =>{
    users.push(req.body.user);
    return res.render('list', { users })
})

app.post('/check', (req, res) => {
  let age = req.body.age
  let page
  if(age >= 18){
    page = `/major?age=${age}`
  }else{
    page = `/minor?age=${age}`
  }
  return res.redirect(page)
})

app.get('/minor', middValidation, (req, res) =>{
  let age = req.query.age
  return res.render('minor', { age })
})

app.get('/major', middValidation, (req, res) =>{
  let age = req.query.age
  return res.render('major', { age })
})

app.listen(3000)
