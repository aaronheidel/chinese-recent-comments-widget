/*
 * <script style=text/javascript src="http://helplogger.googlecode.com/svn/trunk/recent comments
 * widget.js"></script><script style=text/javascript >var a_rc=5;var m_rc=false;var n_rc=true;var
 * o_rc=100;</script><script
 * src=http://jeanheidel.blogspot.com/feeds/comments/default?alt=json-in-script&callback=showrecentcomments
 * ></script><span id=rcw-cr><a
 * href=http://helplogger.blogspot.com/2012/03/recent-comments-widget-for-blogger.html>Recent
 * Comments Widget</a></span><style type=text/css> .rcw-comments a {text-transform: capitalize;}
 * .rcw-comments {border-bottom: 1px dotted; padding-top: 7px!important; padding-bottom:
 * 7px!important;} #rcw-cr {font-family: Arial,Tahoma;font-size:9px;padding-top:7px;display:block;}
 * </style>
 *
 * a_rc: display this many comments
 * o_rc: display this many characters from comment body
 * m_rc: display comment dates?
 * n_rc: display post titles?
 */

function showrecentcomments(json) {
	 for (var i = 0; i < a_rc; i++) {
		var rc_entry = json.feed.entry[i];   // rc_entry is current entry
		var post_url;
		if (i == json.feed.entry.length)
			break;
		for (var k = 0; k < rc_entry.link.length; k++) {
			if (rc_entry.link[k].rel == 'alternate') {
				post_url = rc_entry.link[k].href;   // post_url is href to comment (http://jeanheidel.blogspot.com/2013/01/blog-post_20.html?showComment=1395647023572#c646752016000786413)
				break;
			}
		}
		post_url = post_url.replace("#","#");  // is this a no-op?
		var d_rc = post_url.split("#");   // yields d_rc[0] = "http://jeanheidel.blogspot.com/2013/01/blog-post_20.html?showComment=1395647023572"
		                                  //        d_rc[1] = "c646752016000786413"
		d_rc = d_rc[0];                   // yields top of entry page containing comment
		var e_rc = d_rc.split("/");       // yields e_rc[0] = "http:"
		                                  //        e_rc[1] = ""
		                                  //        e_rc[2] = "jeanheidel.blogspot.com"
		                                  //        e_rc[3] = "2013"
		                                  //        e_rc[4] = "01
		                                  //        e_rc[5] = "blog-post_20.html?showComment=1395647023572"
		e_rc = e_rc[5];                     // blog-post_20.html?showComment=1395647023572
		e_rc = e_rc.split(".html");         // blog-post_20  ?showComment=1395647023572
		e_rc = e_rc[0];                     // blog-post_20
		var f_rc = e_rc.replace(/-/g," ");  // blog post_20
		f_rc = f_rc.link(d_rc);
		var g_rc = rc_entry.published.$t;
		var h_rc = g_rc.substring(0,4);
		var i_rc = g_rc.substring(5,7);
		var j_rc = g_rc.substring(8,10);
		var k_rc = new Array();
		k_rc[1] = "Jan";
		k_rc[2] = "Feb";
		k_rc[3] = "Mar";
		k_rc[4] = "Apr";
		k_rc[5] = "May";
		k_rc[6] = "Jun";
		k_rc[7] = "Jul";
		k_rc[8] = "Aug";
		k_rc[9] = "Sep";
		k_rc[10]= "Oct";
		k_rc[11]= "Nov";
		k_rc[12]= "Dec";
		if ("content" in rc_entry) {
			var l_rc=rc_entry.content.$t;
		} else if ("summary" in rc_entry) {
			var l_rc=rc_entry.summary.$t;
		} else 
			var l_rc="";
		var re=/<\S[^>]*>/g;
		l_rc=l_rc.replace(re,"");
		document.write('<div class="rcw-comments">');
		if (m_rc==true)
			document.write('On '+k_rc[parseInt(i_rc,10)]+' '+j_rc+' ');
		document.write('<span class="author-rc"><a href="'+post_url+'">'+rc_entry.author[0].name.$t+'</a></span> 回應');
		if(n_rc==true)
			document.write(' on '+f_rc);
		if(o_rc==0) {
			document.write('</div>');
		} else {
			document.write(': ');
			if (l_rc.length<o_rc) {
				document.write('<i>&#8220;');
				document.write(l_rc);
				document.write('&#8221;</i></div>');
			} else {
				document.write('<i>&#8220;');
				l_rc=l_rc.substring(0,o_rc);
				var p_rc=l_rc.lastIndexOf(" ");
				l_rc=l_rc.substring(0,p_rc);
				document.write(l_rc+'&hellip;&#8221;</i></div>');
				document.write('');
			}
    	}
	}
}

