var client = new BinaryClient('ws://localhost:9000/streaming');
client.on('stream', function(stream, meta) {
  var parts = [];
  stream.on('data', function(data) {
    parts.push(data);
  });
  stream.on('end', function() {
    var img = document.createElement("source");
    img.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
    img.type = "audio/mpeg";
    document.getElementById("test").appendChild(img);
  });
});

