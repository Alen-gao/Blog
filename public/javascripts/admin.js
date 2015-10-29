$(function(){
    init.HighLight('.nume a');
    init.HighLight('.contLeft a');
    init.HighLight('.choice .radio');

    //发表文章
    $(document).on('click', '.BlogSubmit', function(){
    	var title = $('.BlogTitle').val();
    	var content = $('.BlogCont').val();

    	$.ajax({
    		url: 'http://localhost:3000/Publish/Article',
    		type: 'POST',
    		data: {"title": title, "content": content},
    		success: function(data){
    			if(!data.ok){
    				console.log('没有此用户!');
    			}
    			else{
                    alert("发表成功！");
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