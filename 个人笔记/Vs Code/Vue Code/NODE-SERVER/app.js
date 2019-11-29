// 导入 http 内置模块
const http = require('http')
// 这个核心模块，能够帮我们解析 URL地址，从而拿到 pathname query
const urlModule = require('url')
// 创建一个 http 服务器
const server = http.createServer()
// 监听 http 服务器的 request 请求
server.on('request', function (req, res) {
    //write your code here...
    // req.url 获取的是端口号之后的内容
    // ES6解构赋值：(百度：ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。)
    const { pathname:url,query } = urlModule.parse(req.url, true)

    
    if (url === '/getscript') {
        // 如果是请求一个js脚本，就返回一个脚本。

        var data = {
            name: 'xjj',
            age: 18,
            gender: '女孩子'
        }
        
        
        // 拼接一个合法的JS脚本，这里拼接的是一个方法的调用
        var scriptStr = `${query.callback}(${JSON.stringify(data)})` //模板字符串。data是个对象
        console.log(scriptStr)
        // res.end 发送给客户端，客户端去把 这个 字符串，当做JS代码去解析执行
        res.end(scriptStr)
    } else {
        res.end('404')
    }
})

//指定端口号并启动服务器监听
server.listen(3000, function () {
    console.log('server listen at http://127.0.0.1:3000')
})