
window.upload = function () {
    const ipfsApi = require('ipfs-api');
    const buffer = require('buffer');
    const ecies = require("eth-ecies");
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = ipfsApi('localhost', 5001);

      const ecies = require("eth-ecies");
      let plaintext = new Buffer(`{foo:"bar",baz:42}`);
      let encryptedMsg = ecies.encrypt('0xdfdB0878e3d303b451BDBDfb18348E653e730C03', plaintext);
      
      const buf = buffer.Buffer(encryptedMsg);

      ipfs.files.add(buf, (err, result) => {
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
      })
    }
    const photo = document.getElementById("photo");
    reader.readAsArrayBuffer(photo.files[0]);
  };

  
  
  