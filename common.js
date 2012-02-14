function download_file(nice_name, url, callback) {
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
                        /*$("<iframe></iframe").attr("src", file_entry.toURL()).appendTo("body");*/
                        callback();
                        document.location = file_entry.toURL();
                    };
                    writer.write(bb.getBlob());
                });
            });
        });
    };
    xhr.send();
}
function form_nice_name(authors, title) {
    return authors + " - " + title;
}
function process_link_click(authors, title, type, $link) {
    var text = $link.text();
    $link.text($link.text() + ' (loading)');
    download_file(form_nice_name(authors, title) + '.' + type, $link.attr("href"), function() {
        $link.text(text);
    });
}
