const fs = require("fs");

const privateKey = fs.readFile("./private.pem", "utf8", (err, data)=>{
    if(err){
        console.error("Error file reading", err);
        return;
    }

    console.log("File content :", data);

});

const privateKeyy = fs.readFileSync('private.pem', 'utf8');


console.log(privateKeyy)