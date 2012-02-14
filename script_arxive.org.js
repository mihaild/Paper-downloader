$(function() {
    function get_file_type(url) {
        if (/^\/pdf/.test(url)) {
            return "pdf";
        }
        if (/^\/ps/.test(url)) {
            return "ps";
        }
        return false;
    }
    function get_authors($element) {
        return $element.text().replace("Authors:", "").replace(/\n/g, "").trim();
    }
    function get_title($element) {
        return $element.text().replace("Title:", "").trim()
    }
    if (/arxiv.org\/abs/.test(document.location)) {
        var authors = get_authors($("div.authors"));
        var title = get_title($("h1.title"));
        $("div.full-text a").click(function() {
            var $this = $(this);
            var file_type = get_file_type($this.attr("href"));
            if (!file_type) {
                return true;
            }
            process_link_click(authors, title, file_type, $this);
            return false;
        });
    }
    else if (/arxiv.org\/list/.test(document.location)) {
        $("span.list-identifier a").click(function() {
            var $this = $(this);
            var file_type = get_file_type($this.attr("href"));
            if (!file_type) {
                return true;
            }
            var $dd = $this.parents("dt:first").next();
            var title = get_title($dd.find("div.list-title"));
            var authors = get_authors($dd.find("div.list-authors"));
            process_link_click(authors, title, file_type, $this);
            return false;
        });
    }
});
