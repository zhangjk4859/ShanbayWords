var parseDatetime = function(datetime){
    datetime += '+08:00';
    MM = {Jan:"1月", Feb:"2月", Mar:"3月", Apr:"4月", May:"5月", Jun:"6月", Jul:"7月", Aug:"8月", Sep:"9月", Oct:"10月", Nov:"11月", Dec:"12月"};
    var result = String(new Date(datetime)).replace(/\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
            function($0,$1,$2,$3,$4,$5,$6){
                return MM[$1]+$2+"日, "+$4+":"+$5;
            }
    );
    return result;
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
        return false;
    }

return true;
}

var replaceRelativePath = function(content){

    var set = content.match(/<a href=['|"](\/[^'"]+)['|"]/g);
    if(set && set.length){
        for(var i=0; i<set.length; i++){
            var link = set[i];
            var sets = content.match(/<a href=['|"](\/[^'"]+)['|"]/);
            if(sets && sets.length == 2){
                var url = 'http://www.shanbay.com' + sets[1];
                content = content.replace(sets[1], url);
            }
        }
    }
    return content;
}

var loadThreadCSS = function(){

    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", "css/thread_base.css");
    document.getElementsByTagName("head")[0].appendChild(fileref);

    var deviceFileRef=document.createElement("link")
  	deviceFileRef.setAttribute("rel", "stylesheet")
  	deviceFileRef.setAttribute("type", "text/css")
    if(isiPhone()){
  		deviceFileRef.setAttribute("href", "css/thread_iphone.css");
    }
    else{
    	deviceFileRef.setAttribute("href", "css/thread_ipad.css");
    }
    document.getElementsByTagName("head")[0].appendChild(deviceFileRef);
}

var loadThemeCSS = function(night) {
    var themeFileRef = document.createElement("link");
    themeFileRef.setAttribute("rel", "stylesheet")
    themeFileRef.setAttribute("type", "text/css")
    if(night){
      themeFileRef.setAttribute("href", "css/thread_dark.css");
    }
    else{
      themeFileRef.setAttribute("href", "css/thread_light.css");
    }
    document.getElementsByTagName("head")[0].appendChild(themeFileRef);
}

var isiPhone = function(){
    var agent = navigator.userAgent.toLowerCase();
    return agent.search('iphone')!=-1?true:false;
}

var renderThread = function(posts, append, user_id, reverse, night){
    loadThreadCSS();
    loadThemeCSS(night);
    setTimeout(render, 10);

    function render(){
    if(isiPhone()){
        var MAX_NICKNAME_LENGTH = 5;
        var MAX_TEAMTITLE_LENGTH = 9;
        var MAX_LENGTH = 14;
    }
    else{
        var MAX_NICKNAME_LENGTH = 10;
        var MAX_TEAMTITLE_LENGTH = 15;
        var MAX_LENGTH = 25;
    }
    var thread = {};
    function processData(posts){
        thread['first_page'] = append!=true;
        thread['user_id'] = user_id;
        if(posts.length){
            thread['t'] = posts[0].thread;
            thread.posts = [];
            for(i=0; i<posts.length; i++){
                var post = posts[i];
                post.js_is_topic = (post.id == post.thread.topic_post_id);
                post.js_body_html = markdown.toHTML(post.body);
                post.js_body_html = replaceRelativePath(post.js_body_html);
                post.js_fancy_time = parseDatetime(post.time);
                var team_title = post.team ? post.team.title : '';
                var content = post.author.nickname + team_title;

                if (content.length > MAX_LENGTH){
                    if(post.author.nickname.length > MAX_NICKNAME_LENGTH && team_title.length > MAX_TEAMTITLE_LENGTH){
                        post.author.nickname = post.author.nickname.slice(0, MAX_NICKNAME_LENGTH) + '...';
                        post.team.title = post.team.title.slice(0, MAX_TEAMTITLE_LENGTH) + '...';
                    }
                    else if(post.author.nickname.length > MAX_NICKNAME_LENGTH){
                        tmp_max_length = MAX_LENGTH-team_title;
                        if(post.author.nickname.length > tmp_max_length){
                            post.author.nickname = post.author.nickname.slice(0, tmp_max_length) + '...';
                        }
                    }
                    else{
                        tmp_max_length = MAX_LENGTH-post.author.nickname.length;
                        if (team_title.length > tmp_max_length){
                            post.team.title = post.team.title.slice(0, tmp_max_length) + '...';
                        }
                    }
                }
                if(isEmpty(post.post_to)){
                    post.post_to = undefined;
                }
                if(i == post.length - 1){
                    if (append==false || (append==true && reverse==false)){
                        post.js_is_bottom_post = true;
                    }
                }

                thread.posts.push(post);
            }
        }
    }
    processData(posts);

    $('#thread-title').html(thread.t.title);
    $('body #thread .thread-title').html($("#thread-tmpl").tmpl(thread));

    var to_add_html = $("#posts-tmpl").tmpl(thread);
    if(append==true){
        if($('body #thread .post').length){
            if (reverse==true){
                $(to_add_html).insertBefore($('body #thread .post:first'));
            }
            else {
                $(to_add_html).insertAfter($('body #thread .post:last'));
            }
        }
        else{
            $('body #thread .thread-posts').html(to_add_html);
        }
    }
    else{
        $('body #thread .thread-posts').html(to_add_html);
    }

    var postCount = $(".post").length;
    $(".post").each (function(index, element) {
        if (index == postCount - 1) {
            if ($(element).hasClass('not-bottom-post')) {
                $(element).removeClass('not-bottom-post');
            }
        }
        else {
            if (!$(element).hasClass('not-bottom-post')) {
                $(element).addClass('not-bottom-post');
            }
        }
    });

    function clearHighlightedButton(){
    $('.action-button-edit.active img').attr('src', 'img/icon_edit.png');
    $('.action-button-edit.active').removeClass('active');
    $('.action-button-reply.active img').attr('src', 'img/icon_reply.png');
    $('.action-button-reply.active').removeClass('active');
    }

    $('.action-button-edit').click(function(){

        $(this).find('img').attr('src', 'img/icon_edit_press.png');
        $(this).addClass('active');
        setTimeout(function(){
                  clearHighlightedButton();
                  }, 200);
    });
    $('.action-button-reply').click(function(){

        $(this).find('img').attr('src', 'img/icon_reply_press.png');
        $(this).addClass('active');
        setTimeout(function(){
                   clearHighlightedButton();
                   }, 200);
    });

    var images = $('.post-body img');
    // tag_images(images);

    iPadDetect();
	}
}

function tag_images(images){
    images = _.filter(images, function(img){return $(img).attr('src').search('smilies')==-1})
    _.each(images, function(img){
        if (!$(img).hasClass('user-appended-image')){
            $(img).addClass('user-appended-image');
        }
    });
}


function fixHeight () {
    window.location = "thread-ui://height/"+$('body').height();
    iPadDetect();
}

var callNativeSelector = function(nativeSelector) { // put native selector as param
    window.location = "shanbaycommunity://www.shanbay.com"+nativeSelector;
}

var callNativeHTTPSelector = function(nativeSelector) {
    window.location = "http://www.shanbay.com"+nativeSelector;
}

var callUser = function(user_id) {
    callNativeSelector('/user/'+user_id+'/');
}

var callTeam = function(team_id) {
    callNativeHTTPSelector('/team/detail/'+team_id+'/');
}

var replyPost = function(post_id) {
    callNativeSelector('/post/'+post_id+'/reply/');
}

var editPost = function(post_id) {
    callNativeSelector('/post/'+post_id+'/edit/');
}

var callUserAgentFromPost = function(post_id) {
    callNativeSelector('/post/'+post_id+'/agent/');
}

var updatePost = function(id, content) {
    content = markdown.toHTML(content);
    var html = $('#post-content-tmpl').tmpl({content: content});
    $('#post-' + id + ' .post-body').html(html);

    fixHeight();
}

var getPostposition = function(id){
    var dom = $('#post-' + id + ' .post-body')
    var pos = dom.position();
    pos.width = dom.width();
    pos.height = dom.height();
    return pos;
}

var replaceFlash = function(content){
    var set = content.match(/sid\/(\w+)\/v.swf/);
    if(set && set.length == 2){
        var video_src = "http://v.youku.com/player/getRealM3U8/vid/" + set[1] + "/type//video.m3u8";
        var embed_src="http://player.youku.com/player.php/sid/" + set[1] + "/v.swf";
        var list = ['<video width="280" height="180" src="', video_src, '" ><embed src="', embed_src, '" allowfullscreen="true" quality="high" width="480" height="320" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash"></video>'];
        var replacementStr = list.join('');

        content = content.replace(/<embed[^>]+>/, replacementStr);

    }
    return content;
}


var renderArticle = function(data, night){
    loadThemeCSS(night);
    setTimeout(render, 100);
    function render(){
        $('body .title').html(data.title);
        data.content = replaceFlash(data.content);
        data.content = replaceRelativePath(data.content);
        var html = $('#content-tmpl').tmpl(data);
        $('body .footprint-content').html(html);
        $('body .footprint').css('background-color', data.footprint_background_color);
        $('body .footprint').css('border-color', data.footprint_border_color);
        $('h3.title').css('color', data.title_color);
        $('div.footprint-content').css('color', data.content_color);
        var images = $('.footprint-content img');
        tag_images(images);

        iPadDetect();
    }
};

var iPadDetect = function() {
    var kUserAgent = navigator.userAgent.toLowerCase();
    var kIsIpad = kUserAgent.match(/ipad/i) == "ipad";
}
