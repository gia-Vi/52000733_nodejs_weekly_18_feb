const http = require('http')
const hostname = 'localhost'
const port = '8080'
const url = require('url')
const querystring = require('querystring')
http.createServer((req, res) =>{
    const page = url.parse(req.url).pathname
    if(page === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bai1</title>
        </head>
        <body>
        <table>
            <form method="post" action="/result">
                <tr>
                <td><label for="soHang1">Số hạng 1</label></td>
                <td><input type="text" name="soHang1" id="soHang1"></td>
                </tr>
                <tr>
                <td><label for="soHang2">Số hạng 2</label></td>
                <td><input type="text" name="soHang2" id="soHang2"></td>
                </tr>
                <tr>
                <td><label for="phepTinh">Phép tính</label></td>
                <td><select name="phepTinh" id="phepTinh">
                    <option disabled selected>Chọn phép tính</option>
                    <option value="+">Cộng</option>
                    <option value="-">Trừ</option>
                    <option value="*">Nhân</option>
                    <option value="/">Chia</option>
                </select></td>
                </tr>
                <tr>
                <td></td>
                <td><button type="submit">Tính</button></td>
                </tr>
            </form>
        </table>
        </body>
        </html>
        `)
        res.end()
    }else if(page ==='/result' && req.method ==='POST'){
        let body = ""
        req.on('data', chunk =>{
            body +=chunk.toString();
        })
        req.on('end',()=>{
            const data = querystring.parse(body)
            const soHang1 = parseFloat(data.soHang1)
            const soHang2 = parseFloat(data.soHang2)
            
            if(isNaN(soHang1) == true|| isNaN(soHang2) == true){
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
                    <p>Bạn chưa nhập đủ số hạng</p>
                </body>
                </html>`)
                res.end()
                return
            }
            const phepTinh = data.phepTinh
            let ketQua
            if(phepTinh === '+'){
                ketQua = soHang1 + soHang2
            }else if(phepTinh === '-'){
                ketQua = soHang1 - soHang2
            }else if(phepTinh === '*'){
                ketQua = soHang1 * soHang2
            }else if(phepTinh === '/'){
                ketQua = soHang1 / soHang2
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
                    <p>Bạn chưa chọn phép toán</p>
                </body>
                </html>`)
                res.end()
                return
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(`<p>${soHang1} ${phepTinh} ${soHang2} = <b>${ketQua}</b></p>`)
            res.end()
        })
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