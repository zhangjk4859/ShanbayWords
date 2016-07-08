/*
  * initialize the page with given data
  * data includes: username, special_day, checkin_days, words, reading, sentence,
  * listening, time , user note
*/
var userAgent = navigator.userAgent.toLowerCase();
var versions = userAgent.match(/shanbayappversion\/(\d+)\s/);

var renderData = function(obj){
	$('#checkin-days-data').html(obj['checkin_days']);
	$('#words-data').text(obj['words']);
	$('#reading-data').text(obj['reading']);
	$('#sentences-data').text(obj['sentences']);
	$('#listening-data').text(obj['listening']);
    var speak_data = obj['speak'];
    if (speak_data != undefined && $('#speak-data').length > 0) {
        // speak data valid and new theme loaded
	    $('#speak-data').text(speak_data);
        $('#speak-data').show();
	    $('#speak-display').show();
	    $('#used-time').text(obj['time']);
	    $('#used-time-container').show();
        if (obj['checkin_days'] > 999) {
            $('#used-time-container').addClass('large-checkin-days');
        }
    } else {
        // no speak data or theme is not ready
	    $('#used-time-data').text(obj['time']);
	    $('#used-time-data').show();
	    $('#used-time-display').show();
    }

	setTimeout(function(){
		var height = screen.height;
		$('body').css({
			minHeight: height
		})
	},500);

	if(obj['user_name']){
		$('#user-name-data').text(obj['user_name']);
        $('.username').show();
	}

	if(obj['special_day']){
		$('.special-day-badge').show();
		$('.daily-badge').hide();
	} else {
		$('.special-day-badge').hide();
		$('.daily-badge').show();
    }

	if(obj['diary']){
		$('#diary-hint').hide();
		$('#diary-data').text(obj['diary']);
	}
    if (obj['checkin_days'] > 7) {
        $('#share-text').html('分享成就');
    }
	gloabalStyleAdjust();
    var regExp1 = /com\.shanbay\.words/;
    var regExp2 = /android/;
    if(regExp2.test(userAgent)){
        //android phone
        if(versions && versions[1] < 41000 && regExp1.test(userAgent)){
            //android phone with old version
            lowVersionShareBind();
            renderFinish();
			displayTipBox();
        } else {
			displayShareShowBtn();
		}
    } else {
        // iPhone
		displayShareShowBtn();
    }
};

var displayShareShowBtn = function(){
	$('.share-show-btn').show();
}

var displayTipBox = function(){
	$('.tip').show();
}

// render finish signal
var renderFinish = function(){
	window.location = 'shanbay.native.app://checkin/rendered/';
};

/*
  * update diary
  * if param is null, the diary set hide
  * not null, show diary
*/
var updateDiary = function(diary_str){
	if(diary_str){
		$('#diary-hint').hide();
		$('#diary-data').text(diary_str);
	}else{
		$('#diary-data').text('');
		$('#diary-hint').show();
	}
	renderFinish();
};

// native window router
var callNativeSelector = function(selector){
	window.location = 'shanbay.native.app://' + selector;
};

// checkin page award hint 'detail' btn
var callAwardDetail = function(){
	callNativeSelector('checkin/award/detail/');
};

// checkin page weibo share btn
var callWeiboShare = function(){
	callNativeSelector('checkin/share/weibo/');
};

// checkin page weixin chat share btn
var callWeixinChatShare = function(){
	callNativeSelector('checkin/share/weixinchat/');
};

// checkin page weixin moments share btn
var callWeixinMomentsShare = function(){
	callNativeSelector('checkin/share/weixinmoments/');
};

// checkin page diary edit action
var callNoteEdit = function(){
	callNativeSelector('checkin/note/edit/')
};

// checkin share bottom bar show action
var callShareBarShow = function(color_str){
	callNativeSelector('checkin/share/bar/show?bg='+color_str);
};

// checkin share bottom container show action
var callShareContainerShow = function(color_str){
	callNativeSelector('checkin/share/container/show?bg='+color_str);
};

/*
  * checkin page btn events bind
*/
$('.diary-box').click(function(){
    var regExp1 = /com\.shanbay\.words/;
    var regExp2 = /android/;
    if(versions && versions[1] < 41000 && regExp1.test(userAgent) && regExp2.test(userAgent)){
        return false;
    }else{
        callNoteEdit();
        return true;
    }
});

$('.tip .detail').click(function(){
	callAwardDetail();
});

$('.share-show-btn>div').click(function(){
    var regExp2 = /android/;
    if(regExp2.test(userAgent)){
		callShareContainerShow('#FFEDEAE0');
	}else {
		callShareContainerShow('#EDEAE0');
	}
});

var lowVersionShareBind = function(){
	$('.weibo').click(callWeiboShare);
	$('.weixin-moments').click(callWeixinMomentsShare);
	$('.weixin-chat').click(callWeixinChatShare);
}

/*
  * Diary Position Adjustment
*/
var diaryDataPositionAdjust = function(){
	//diary adjust
	var selector = '.diary-box';
	var diaryHeight = $(selector).height();
	var diaryWidth = $(selector).width();
	var lineHeight = diaryHeight * 0.26;
	var diaryDataTop = $(selector).offset().top + diaryHeight * 0.18;
	var diaryDataLeft = $(selector).offset().left + diaryWidth * 0.12;
	var diaryDataHeight = diaryHeight * 0.78;
	var diaryDataWidth = diaryWidth * 0.76;
	$('#diary-data-box').css({'top': diaryDataTop, 'left': diaryDataLeft, 'height': diaryDataHeight,
							'width': diaryDataWidth, 'line-height': lineHeight+'px'}).show();
};

var gloabalStyleAdjust = function(){
	//diaryDataPositionAdjust();
};

//Window Resize Listen
$(window).resize(function(){
	gloabalStyleAdjust();
});

/*
  * Document Ready Action
*/
$(document).ready(function(){
	gloabalStyleAdjust();
});
