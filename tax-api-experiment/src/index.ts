import express from 'express'
const app = express()
const port = 3001
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/check-post', (req, res) => {
  res.send('Hello POST!')
})
app.post('/check-json', (req, res) => {
  res.json({ message: 'Hello JSON!' })
})
app.post('/check-status-code', (req, res) => {
  res.status(500).json({ message: 'Hello StatusCode!' })
})
app.post('/check-body', (req, res) => {
  console.dir(req.body)
  res.json({ message: 'Hello JSON body!' })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
