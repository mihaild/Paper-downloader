# Paper downloader
Paper downloader is a simple chrome plugin which helps to download files from digital libraries with human readable file names.
For example, when you download file from arxiv.org, you get something looks like "1234.5678.pdf".
With this plugin, you get file named "%AUTHOR\_NAME% - %PAPER\_NAME%.pdf" instead.

[This plugin in chrome webstore](https://chrome.google.com/webstore/detail/nkpcgjafmckjhhoogopopoaaogjhkkie)

## How it works
Plugin adds it's own handler to "onclick" event on download link. When you click it, the file is downloaded to HTML5 Filesystem, and then it opens from thence.

Common functions for all sites are in **common.js** file. They are

 * ```download_file(nice_name, url, callback)```, where *nice_name* is name which file will get, *url* is url for original file, and *callback* is function, which will be called after downloading.
Note, that if file will be opened instead of saving (for PDF, for example), this function wiil not be called.

 * ```process_link_click(authors, title, type, $link)```, where *authors* and *title* are strings, *type* is file extension, and *$link* is jQuery object for download link. This function adds "(loading)" to link text, and removes it after download.
Probably, you should to use this function instead of call ```download_file``` directly, because in the second case you should manually to show user, that download is in progress.

## How to write a script for another site
1. Write a script for your site.
Probably, it has to add an ```onclick``` event handler to download links, and call ```process_link_click``` for them.
Using jQuery for DOM traversing is recommended.

2. Modify **manifest.json**: add your site to ```permissions```, and your site and script to ```content_scripts```.

3. You can test it, using ```Load unpacked extension``` function in chrome. Read [chrome extensions tutorial](http://code.google.com/chrome/extensions/getstarted.html) for more information.

4. (optional) Create a push request with your script. In this case, file with your script should have name like *script_yoursite.com.js*. If you'll do it, your changes will appear in webstore after I'll check them.
