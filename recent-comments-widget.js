function summarize_comment(comment, chars) {
	if (chars > 0 && comment.length > chars)
//		comment = comment.substring(0, chars) + '&hellip;';
		comment = comment.substring(0, chars) + '&nbsp;-';
	return comment;
}

function humanize_datetime(timestamp) {
	// timestamp = "2014-03-24T15:43:43.572+08:00"
	var yyyy = timestamp.substring(0,4);   // 2014
	var mm = timestamp.substring(5,7).replace(/^0+/, ''); // 3
	var dd = timestamp.substring(8,10);    // 24
	var hh  = timestamp.substring(11,13);  // 15
	var min = timestamp.substring(14,16);  // 43
	var sec = timestamp.substring(17,23);  // 43.572
	var time = mm + '/' + dd + ' ';
	var am = true;
	if (hh > 12) {
		am = false;
		hh -= 12;
	} else {
	}
	time += hh + ':' + min + (am ? 'am' : 'pm');
	return time;
}

function get_comment_link(entry) {
	var url = '';
	for (var i = 0; i < entry.link.length; i++) {
		if (entry.link[i].rel == 'alternate') {
			return entry.link[i].href;   // post_url is href to comment (http://myblog.blogspot.com/2013/01/blog-post_20.html?showComment=1395647023572#c646752016000786413)
		}
	}
	return url;
}

function extract_post_title_from_url(url) {
	var title = url.split("/");       // [0] = "http:", ...
	title = title[5];              // blog-post_20.html?showComment=1395647023572
	title = title.split(".html");  // blog-post_20  ?showComment=1395647023572
	title = title[0];              // blog-post_20
	return title.replace(/-/g," ");  // blog post_20
}

function showrecentcomments(json) {
	for (var i = 0; i < rc_comment_count; i++) {
		var rc_entry = json.feed.entry[i];   // rc_entry is current entry
		if (i == json.feed.entry.length)
			break;
		var post_url = get_comment_link(rc_entry);
		var comment_url = post_url.split("#");
		   // yields comment_url[0] = "http://myblog.blogspot.com/2013/01/blog-post_20.html?showComment=1395647023572"
		   //        comment_url[1] = "c646752016000786413"
		comment_url = comment_url[0];                   // yields top of entry page containing comment
		var post_link = extract_post_title_from_url(comment_url).link(comment_url);
          // <a href="http://myblog.blogspot.com/2013/01/blog-post_20.html?showComment=1395647023572">blog post_20</a>
		if ("content" in rc_entry) {
			var contents = rc_entry.content.$t;   // contents of comment
		} else if ("summary" in rc_entry) {
			var contents = rc_entry.summary.$t;
		} else 
			var contents = "";
		var regex = /<\S[^>]*>/g;               // catches any HTML tag
		contents = contents.replace(regex,"");          // erase HTML tags

		// replace author name if necessary with 版主 or 匿名
		var comment_author = rc_entry.author[0].name.$t;
		if (comment_author == json.feed.author[0].name.$t) comment_author = '版主';
		if (comment_author == 'Anonymous') comment_author = '匿名';

		document.write('<div class="rcw-comments">');
		// write comment
		if(rc_comment_chars > 0) {
			document.write('<a href="'+post_url+'"><i>');
			document.write( summarize_comment(contents, rc_comment_chars) );
			document.write('</i></a>');
    	}

		// write author (if no comment is shown, make the author's name a link)
		document.write(' <span class="author-rc">');
		if (rc_comment_chars == 0) document.write('<a href="'+post_url+'">');
		document.write(comment_author);
		if (rc_comment_chars == 0) document.write('</a>');
		document.write('</span>');

		// write date/time
		if (rc_show_datetime == true)  // display comment date?
			document.write(' ' + humanize_datetime(rc_entry.published.$t));
		document.write('</div>');
	}
}
