$(document).ready(function(){
    $('input.typeahead').typeahead({
        name: 'countries',
        remote: 'http://localhost:3000/profile/search?key=%QUERY',
        limit: 10
    });

    $('#likeImage').click(function(){
        //alert('Hii');
        let flag=1;  
        if($('#likeImage').val()=='dislike')
        flag=0;


        if($('#likeImage').val()=='like'){
            //$('#likeImage').html('dislike');
            $('#likeImage').attr('value',"dislike");
        }
        else{
            //$('#likeImage').html('like');
            $('#likeImage').attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+1+"/likeImage/"+flag, 
            type:"POST",
            timeout:500,
            //dataType:'json',
            success: function(){
                //
                alert('Liked!');
            },
            error:function(error){
                throw error;
            }
        });
    });
    
    /*$(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
        // ajax call get data from server and append to the div
            ('#add-data').append('<li>Main<li>')
        }
    });*/
    $('#search-user-form').submit(function(){
        let username = $('#search-text').val();
        //alert(username);
        $(this).attr('action', "/account/" + username);
    });
});
function showFeed(id){
    window.location='/showfeed/'+id;
    return false;
}

function showAccount(username){
    window.location='/account/'+username;
    return false;
}

function likeImage(feedname,data){
        //alert(feedname);
        let flag=1;  
        if($(data).val()=='dislike')
        flag=0;


        if($(data).val()=='like'){
            //$(data).html('dislike');
            $(data).attr('value',"dislike");
        }
        else{
            //$(data).html('like');
            $(data).attr('value',"like");
        }
        $.ajax({
            url: "/profile/postFeed/"+feedname+"/likeImage/"+flag, 
            type:"POST",
            timeout:500,
            //dataType:'json',
            success: function(){
                //
                alert(url);
                //alert('Liked!');
            },
            error:function(error){
                throw error;
            }
        });
}


