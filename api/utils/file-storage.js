var fs = require('fs');
var https = require('https');


const storage = {
    saveImageToFile: (localPath, imageUrl) => {
        var file = fs.createWriteStream(localPath);
        https.get(imageUrl, function (response) {
            response.pipe(file);
        });
    }
}
module.exports = storage;

//example usage
//storage.saveImageToFile('./pics/haydenwade3.jpg','https://www.haydenwade.com/assets/haydenwade3.jpg')