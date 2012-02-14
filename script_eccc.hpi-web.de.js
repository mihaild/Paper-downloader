$(function() {
    $("#box div:first").next().next().find("a:first").click(function() {
        var $this = $(this);
        var authors = [];
        $this.nextAll("a").each(function() {
            var $this = $(this);
            if (!/^\/author\/[\d]*$/.test($this.attr("href"))) {
                return false;
            }
            authors.push($this.text());
        });
        authors = authors.join(", ");
        var title = $("#box h4:first").text();
        process_link_click(authors, title, 'pdf', $this);
        return false;
    });
});
