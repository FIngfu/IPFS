var myExtObject = (function() {
    window.upload = function () {
        const buffer = require('buffer');
        const ecies = require("eth-ecies");
        const reader = new FileReader();
        reader.onloadend = function () {
          const ipfs = window.IpfsApi('localhost', 5001)
          const buf = buffer.Buffer(reader.result)
          ipfs.files.add(buf, (err, result) => {
            if (err) {
              console.error(err)
              return
            }
            let url = `https://ipfs.io/ipfs/${result[0].hash}`
            console.log(`Url --> ${url}`)
            document.getElementById("url").innerHTML = url
            document.getElementById("url").href = url
            document.getElementById("output").src = url
          })
        }
        const photo = document.getElementById("photo");
        reader.readAsArrayBuffer(photo.files[0]);
      };

    return {
      func1: function() {
        alert('function 1 called');
      },
      func2: function() {
        alert('function 2 called');
      }
    }
  
  })(myExtObject||{})
  
  
  var webGlObject = (function() { 
    return { 
      init: function() { 
        alert('webGlObject initialized');
      } 
    } 
  })(webGlObject||{})