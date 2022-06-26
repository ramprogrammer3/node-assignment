
const http = require('http')
const port = 8080;
const fs = require('fs');
const { default: axios } = require('axios');
const server = http.createServer(async(req,res)=>{
    if(req.url == "/"){
        fs.readFile('./index.html',(err,data)=>{
            if(!err){
                res.writeHead(200, {'content-type': "text/html"});
                res.write(data);
                res.end();
            }else{
                res.writeHead(404)
                res.write("data not found ")
                res.end();
            }
        })
    }else if(req.url == "/book"){
        res.writeHead(200,{"content-type": "application/json"})
        const response = await axios.get("https://api.itbook.store/1.0/search/mongodb")
        res.write(JSON.stringify(response.data.books))
        res.end();
    }else if(req.url == '/video'){
        fs.readFile('./anjali.mp4', (err,data)=>{
            if(!err){
                res.writeHead(200, {'content-type': "video/mp4"})
                res.write(data)
                res.end();
            }else{
                res.writeHead(404);
                res.write("vidoe not found")
                res.end();
            }
        })
    }
})
server.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})

