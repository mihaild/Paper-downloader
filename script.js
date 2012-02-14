$(function() {
    var links = $("div.full-text a");
    var authors = $("div.authors").text().replace("Authors:", "").replace(/\n/g, "");
    var title = $("h1.title").text().replace("Title:", "").trim();
    var file_base_name = authors + " - " + title;
    var file_types = {
        'PDF':  'pdf',
        'PostScript': 'ps'
    };
    links.click(function() {
        if (!file_types.hasOwnProperty($(this).text())) {
            return true;
        }
        var file_type = file_types[$(this).text()];
        var xhr = new XMLHttpRequest();//todo: use jQuery
        xhr.open('GET', $(this).attr("href"), true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function(e) {
            window.webkitRequestFileSystem(TEMPORARY, xhr.response.byteLength, function(fs) {
                fs.root.getFile(file_base_name + "." + file_type, {create: true}, function(file_entry) {
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
        return false;
    });
});
