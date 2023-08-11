const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json())

const port = 8000

let users = []
let counter = 1

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
  let filterUsers = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + ' ' + user.lastname
    }
  })
  res.json(filterUsers)
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
  let user = req.body
  user.id = counter
  counter += 1

  users.push(user)

  res.json({
    message: 'insert ok',
    data: user
  })
})

// GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
  let id = req.params.id
  const selectedIndex = users.findIndex(user => user.id = id)
  res.json(users[selectedIndex])
})

// path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  const selectedIndex = users.findIndex(user => user.id = id)

  users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname
  users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname

  res.json({
    message: 'update user complete!',
    data: updateUser
  })
})


// path DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
  let id = req.params.id

  const selectedIndex = users.findIndex(user => user.id = id)

  users.splice(selectedIndex, 1)

  res.json({
    message: 'delete ok',
    indexDeleted: selectedIndex
  })
})

app.listen(port, async (req, res) => {
  console.log('http server run at ' + port)
})