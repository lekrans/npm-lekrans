const HTTPS = require('https');
const FS = require('fs');

//request object literal
let options = {
    hostname: 'en.wikipedia.org',
    port: 443, // oftn on local servers the port is 80 and on commercial 443
    path: '/wiki/George_Washington',
    method: 'GET',
};

let req = HTTPS.request(options, (res) => {
    let responseBody = '';

    console.log('Response from server started.');
    console.log(`Server Status: ${res.statusCode} `);
    console.log('Response Headers: %j', res.headers); //res.headers = JSON... %j is doing a JSON.stringify on the content

    res.setEncoding('UTF-8');

    res.once('data', (chunk) => { //this will fire on the first data.. 
        console.log('');
        console.log('');
        console.log('HERE COMES THE FIRST CHUNK')
        console.log(chunk); // just log it so we can see how a chunk can look like    
    });

    res.on('data', (chunk) => { //this will ALSO fire on the first data.. and the rest
        console.log(`--chunk-- ${chunk.length} | `);        
        responseBody += chunk; 
    });

    res.on('end', () => {
        FS.writeFile('myWikiHtml.html', responseBody, (err) => {
            if (!err) {
                console.log('File downloaded..');
            } else {
                throw err;
            }
        });      
    });
});

req.on('error', (err) => {
    console.log(`Problem with request: ${err.message}`);
});

req.end();



