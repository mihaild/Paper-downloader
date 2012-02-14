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
        download_file(file_base_name + '.' + file_type, $(this).attr("href"));
        return false;
    });
});
