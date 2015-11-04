var url = 'http://10.60.217.151:3000/'
$(function(){

    //获取文章信息
    // $(document).on('click', '.home', function(){
        $.ajax({
            url:  url +'Article/query',
            data: {},
            type: 'POST',
            success: function(data){
                if(!data.ok){
                    console.log('没有文章!');
                }
                else{
                    console.log("请求发送成功!", data.result);
                    for(var o in data.result){
                        console.log('o', o);
                        var html = "<dl class='cont-dl'><dt><div class='title-left'><div class='Release-date'><span>30</span><strong>July</strong></div>"+
                                   "<div class='avatar'><img src='../images/photo.jpg'></div><div class='praise'><a href='/blogPage' class='main_title'>"+data.result[o].title+"</a></div>"+
                                   "</div><p class='title-right'></p></dt><dd><a href='/blogPage' class='main_cont'>"+data.result[o].content+"</a></dd><dd>"+
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
    	var username = $('.username').val();
    	var password = $('.password').val();
    	$.ajax({
    		url: 'http://10.60.217.151:3000/views/main',
    		type: 'POST',
    		data: {"username": username, "password": password},
    		success: function(data){

    			if(!data.ok){
    				console.log(data.result);
    			}
    			else{
                    location.href = '/admin';
    				console.log('登录成功!');
    			}
    		},
    		error: function(err){
    			console.log('err', err);
    		}
    	});
    });

    //选取相册效果
    // var chooser = document.getElementById('loadPhoto');
    // chooser.addEventListener('change', function (event) {
    //     var files = this.files;
    //     $('.contRight').append("<p>"+this.files+"</p>");
    // });
    
    // $(document).on('change', '#loadPhoto', function(){

    //     var files = $(this);
    //     window.console.log('files', files);
    //     // for (var i = 0; i < files.length; ++i){
    //     //     var time = audioTime(files[i].path);
    //     //     var musicName = files[i].name.substring(0,files[i].name.indexOf('.'));
    //     //     apendText(musicName,files[i].path);
    //     // }

    // });

});