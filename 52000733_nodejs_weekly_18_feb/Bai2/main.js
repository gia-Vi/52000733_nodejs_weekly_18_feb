const http = require('http')
const hostname = 'localhost'
const port = '8080'
const url = require('url')
const querystring = require('querystring')
const emailAdmin = "admin@gmail.com"
const passwordAdmin = "123"
http.createServer((req, res) =>{
  const page = url.parse(req.url).pathname
  if(page === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
        <title>Bai2</title>
    </head>
    <body>
        <div class="container">
            <h2>Đăng nhập</h2>
            <form action="/login" method="post">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter password" name="password">
              </div>
              <button type="submit" class="btn btn-primary">Đăng nhập</button>
            </form>
          </div>      
    </body>
    </html>`)
    res.end()
  }else if (page ==='/login' && req.method === 'POST'){
    let body = ""
    req.on('data', chunk =>{
        body +=chunk.toString();
    })
    req.on('end',()=>{
        const data = querystring.parse(body)
        const email = data.email
        const password = data.password
        if(email === emailAdmin && password === passwordAdmin){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <p>Đăng nhập thành công</p>
                </body>
                </html>`)
            res.end()
        }else if(email === emailAdmin){
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <p>Mật khẩu không hợp lệ</p>
                </body>
                </html>`)
            res.end()
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <p>Thông tin đăng nhập không hợp lệ</p>
                </body>
                </html>`)
            res.end()
        }
    })
  }else if(page ==='/login' && req.method === 'GET'){
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>Phương thức GET không được hỗ trợ </p>
        </body>
        </html>`)
    res.end()
  }else{
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>Đường dẫn không hợp lệ</p>
        </body>
        </html>`)
    res.end()
  }
}).listen(port)