const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase().trim())
  })
  if (restaurants.length === 0){
    res.render('searchnoresult', { keyword: keyword })
  } else {
    res.render('index', { restaurantList: restaurants, keyword: keyword })
  }
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})