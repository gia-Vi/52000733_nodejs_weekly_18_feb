const http = require('http')
const url = require('url')
const port = '8080';

const students = [
    { id: 1, name: 'Nguyễn Thuận Phát', age: 21 },
    { id: 2, name: 'Trần Gia Hoàng', age: 21 },
    { id: 3, name: 'Dương Trọng Chí', age: 21 },
    { id: 4, name: 'Trần Tống Gia Vũ', age: 21 },
]

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)

    if (parsedUrl.pathname === '/students' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(students))
    } else if (parsedUrl.pathname === '/students' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
        body += chunk.toString()
        })
        req.on('end', () => {
        const student = JSON.parse(body)
        student.id = students.length + 1
        students.push(student)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(student))
        })
    } else if (parsedUrl.pathname.startsWith('/students/') && req.method === 'GET') {
        const id = parseInt(parsedUrl.pathname.substring(10))
        const student = students.find(s => s.id === id)
        if (student) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(student))
        } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Student not found' }))
        }
    } else if (parsedUrl.pathname.startsWith('/students/') && req.method === 'PUT') {
        const id = parseInt(parsedUrl.pathname.substring(10))
        const studentIndex = students.findIndex(s => s.id === id)
        if (studentIndex !== -1) {
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
        })
        req.on('end', () => {
            const updatedStudent = JSON.parse(body)
            updatedStudent.id = id
            students[studentIndex] = updatedStudent
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updatedStudent))
        })
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Student not found' }))
        }
    } else if (parsedUrl.pathname.startsWith('/students/') && req.method === 'DELETE') {
        const id = parseInt(parsedUrl.pathname.substring(10))
        const studentIndex = students.findIndex(s => s.id === id)
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1)
            res.writeHead(204)
            res.end()
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Student not found' }))
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Endpoint not found' }))
    }
}).listen(port)
