const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {restaurantList: restaurantList.results})
})

app.get('/restaurants/1', (req, res) => {
  const restaurantOne = {
    id: 1,
    name: "布娜飛比利時啤酒餐廳",
    category: "義式餐廳",
    location: "台北市松山區市民大道四段 185 號",
    google_map: "https://goo.gl/maps/V9mKwVJ4s5v",
    phone : "02 2570 1255",
    description: "我們希望帶給您的，不只是啤酒，有美食，還有一份對生活的熱情。 義大利語「Bravo」的原意─「喝采」、「讚揚」， 我想著如果有一個大家都能輕鬆品嚐美酒、享受美食的地方，那就真的是太棒了！ 因為這個念頭，加上一股對比利時啤酒的熱情， 於是「Bravo Beer布娜飛比利時啤酒餐廳」在2006年誕生了...",
    image : "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5634/08.jpg",
  }
  res.render('show', { restaurant: restaurantOne })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})