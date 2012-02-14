function download_file(nice_name, url) {
    var xhr = new XMLHttpRequest();//todo: use jQuery
    xhr.open('GET', url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {
        window.webkitRequestFileSystem(TEMPORARY, xhr.response.byteLength, function(fs) {
            fs.root.getFile(nice_name, {create: true}, function(file_entry) {
                file_entry.createWriter(function(writer) {
                    var bb = new WebKitBlobBuilder();
                    bb.append(xhr.response);
                    writer.onwrite = function(e) {
                        $("<iframe></iframe").attr("src", file_entry.toURL()).appendTo("body").load(function() {
                            file_entry.remove();
                        });
                    };
                    writer.write(bb.getBlob());
                });
            });
        });
    };
    xhr.send();
}
