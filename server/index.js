// ทำการ import http เข้ามาเพื่อทำการ run server
const http = require('http')

const host = 'localhost'
const port = 8000 // localhost:8000

// กำหนดค่าเริ่มต้นของ server เมื่อเปิดหน้าเว็บที่ localhost:8000 ขึ้นมา
const requestListener = function (req, res) {
  res.writeHead(200)
  res.end("My first server!")
}

// ทำการ run server
const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})