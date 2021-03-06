const os = require('os');
const express = require('express');
const cors = require('cors');

const package = require('./package');
const { count } = require('./mongolib');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.ENABLE_CORS) {
    app.use(cors());
}

const getInfo = req => ({
    request: {
        url: req.url,
        method: req.method,
        url: req.url,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        params: req.params,
        path: req.path,            
    },
    headers: req.headers,
    env: process.env,
    ver: package.version,
    host: {
        name: os.hostname(),
        uptime: os.uptime(),
        arch: os.arch(),
    }, 
})



app.use('/favicon.ico', async (req, res) =>  { res.send(null) });

app.get('/', async (req, res) =>  {
    res.sendFile(`${__dirname}/assets/index.html`)
});

app.get('/api/v1/status', async (req, res) =>  {
    console.log(`${new Date().toISOString()} - ${req.method}: ${req.originalUrl}`);

    const counter = await count();

    res.send({
        counter,
        ...getInfo(req),  
    })
});

app.get('/api/v1/data', async (req, res) =>  {
    res.send(`hi from ${os.hostname()} - ${ (Math.random() * 999999).toFixed(0) }`)
});

app.get('/api/v1/count', async (req, res) =>  {
    const result = {
        host: os.hostname(),
    };
    try {
        console.log('/api/v1/count')
        
        const counter = await count();
        if (counter === -1) result.error = 'no connection string';
        else if (counter === -2) result.error = 'db error';
        else result.counter = counter;

        res.send(result)
    }
    catch(e) {
        console.warn(e);
        return { error: e.toString()}
    }
});

app.get('/api/v1/failure', async (req, res) =>  {
    res.send(`Failing ${os.hostname()} - bye bye`)
    setTimeout(() => require('child_process').exec('kill 1'), 500);
});

app.use('*', (req, res) => {
    res.send(getInfo(req))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});