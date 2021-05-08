const  express = require('express') 
const  { createProxyMiddleware } = require('http-proxy-middleware') 


const dotenv = require('dotenv') 
const path = require('path') 
const app = express()
dotenv.config()

const apiProxyTarget = process.env.API_PROXY_TARGET;


app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
app.use(express.static('public'));
app.use(createProxyMiddleware("/api", { target: apiProxyTarget, changeOrigin: true }));
app.get('*', (req, res, next) => {
   
    res.sendFile(path.join(__dirname, 'public/index.html'))
})







const port = process.env.PORT || 8000
app.listen(port, function() {
    console.log(`UI started on port ${port}` )
})