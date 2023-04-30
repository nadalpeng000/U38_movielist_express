const express = require('express')
const app = express()

const port = 3000

// require packages used in the project
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  // pass the movie data into 'index' partial template
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movie  = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movie, keyword: keyword })
})

// movie detail
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie })
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`app is running by express on http://localhost:${port}`)
})