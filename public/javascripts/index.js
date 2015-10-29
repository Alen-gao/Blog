$(function(){

    //获取文章信息
    // $(document).on('click', '.home', function(){
        $.ajax({
            url: 'http://10.60.217.195:3000/Article/query',
            data: {},
            type: 'POST',
            success: function(data){
                console.log("请求发送成功!", data.data);
                if(!data.ok){
                    console.log('没有文章!');
                }
                else{
                    console.log("文章插叙成功!", data);
                    for(var o in data.data){
                        var html = "<dl class='cont-dl'><dt><div class='title-left'><div class='Release-date'><span>30</span><strong>July</strong></div>"+
                                   "<div class='avatar'><img src='../images/photo.jpg'></div><div class='praise'><a href='/blogPage' class='main_title'>"+data.data[o].title+"</a></div>"+
                                   "</div><p class='title-right'></p></dt><dd><a href='/blogPage' class='main_cont'>"+data.data[o].content+"</a></dd><dd>"+
                                   "<p class='txte-article fl'>JavaScript</p><p class='fr'><span class='reply'>35500</span> <span class='browse'>30</span> "+
                                   "<span class='reserved'>12564</span> </p></dd></dl>";
                        $('.cont-left').append(html);
                    }
                }
            },
            error: function(err){
                console.log('err', err);
            }
        });

    // });
    
    //点击登录
    $(document).on('click', '#login', function(){
    	var user = $('.username').val();
    	var pass = $('.password').val();
    	$.ajax({
    		url: 'http://10.60.217.195:3000/views/main',
    		type: 'POST',
    		data: {"user": user, "pass": pass},
    		success: function(data){
    			console.log("请求发送成功!", data.data);
    			if(!data.ok){
    				console.log('没有此用户!');
    			}
    			else{
                    console.log("请求发送成功!", data);
                    location.href = '/admin'
    				console.log('登录成功!');
    			}
    		},
    		error: function(err){
    			console.log('err', err);
    		}
    	});
    });
});