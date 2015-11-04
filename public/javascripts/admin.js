var url = 'http://10.60.217.151:3000/'
$(function(){
    init.HighLight('.nume a');
    init.HighLight('.contLeft a');
    init.HighLight('.choice .radio');

    //发表文章
    $(document).on('click', '.BlogSubmit', function(){
    	var title = $('.BlogTitle').val();
    	var content = $('.BlogCont').val();

    	$.ajax({
    		url:  url + '/Publish/Article',
    		type: 'POST',
    		data: {"title": title, "content": content},
    		success: function(data){
    			if(!data.ok){
    				console.log('发表失败!');
    			}
    			else{
                    alert("发表成功！");
                    location.href = '/admin';
    			}
    		},
    		error: function(err){
    			console.log('err', err);
    		}
    	});

    });
});


var init = {
    //点击高亮函数封装    
    HighLight: function(Element){
        $(document).on('click', Element, function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
}