// JavaScript Document
window.fbAsyncInit = function () {
	FB.init({
		appId: '566549573460943', //api 2.0 nccu web test
		xfbml: true,
		version: 'v2.0'
	});

	FB.getLoginStatus(function (response) {
		if (response.status === 'connected') {

			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			FB.api('/me', function (response) {
				console.log(response);
				console.log('My links is ' + response.link);
				console.log('My Username is ' + response.name);
				console.log('My ID is ' + response.id);
            });

/*
			FB.ui({
				method: 'share',
				href: 'https://kangw3n.github.io/facebook/',
			}, function (response) {
				if (response && !response.error_code) {
					alert('Posting completed.');
				} else {
					alert('Error while posting.');
				}
			});
*/
			// FB.ui({
			// 	method: 'send',
			// 	link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
			// });



/*
			FB.api('/me/likes', function (response) {
				for (var i = 0; i < response.length; i++){
					console.log(response.data.name);
				}
			});
*/
			FB.api('/me/picture?type=large', function(response) {  // normal/large/squere
				//var str="<img src="+ response.data.url +">";
				$('#profile').attr("src",response.data.url);
			});

					

					/*FB.api('/me/photos', 'post', {
						name: 'this is a new photo',
						message: 'this is parse photo',
						url: "img/overlay.png"
					}, function (response) {
						if (!response || response.error) {
							alert('Error occured:' + response);
						} else {
							alert('Post ID: ' + response.id);
						}
					});
*/					



		} else if (response.status === 'not_authorized') {
			console.log("this user is not authorizied your apps");
			FB.login(function (response) {
				// FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
				if (response.authResponse) { // if user login to your apps right after handle an event
					window.location.reload();
				};
			},{
				scope: 'user_about_me,email,user_location,user_photos,publish_actions,publish_stream,user_birthday,user_likes'
			});
		} else {
			console.log("this isn't logged in to Facebook.");
			FB.login(function (response) {
				if (response.authResponse) {
					window.location.reload();
				} else {
                            //alertify.alert('An Error has Occurs,Please Reload your Pages');
                        }
                    });
		}
	});

	/*--------Canvas Setting----START----------------------------------------------*/
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.font = '20px "Arial"';
	ctx.fillText("Move here to start fill with Facebook Profile Picture", 40, 270);

	var img = new Image(); // load img
    img.src = "img/overlay.png";

    var img2 = new Image();
    img2.src = "img/overlay2.png"
    
    var img3 = new Image();
    img3.src = "img/typography.png"

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasOffset = $("#canvas").offset();
	//console.log(canvasOffset);
    var offsetX = canvasOffset.left;
	console.log(offsetX);

    var offsetY = canvasOffset.top;
	console.log(offsetY);

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var isDragging = false;

    function handleMouseDown(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // set the drag flag
        isDragging = true;
    }

    function handleMouseUp(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // clear the drag flag
        isDragging = false;
    }

    function handleMouseOut(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
        // user has left the canvas, so clear the drag flag
        isDragging=false;
    }

    function handleMouseMove(e) {
        canMouseX = parseInt(e.clientX - offsetX);
        canMouseY = parseInt(e.clientY - offsetY);
		console.log(canMouseX);
        // if the drag flag is set, clear the canvas and draw the image
        if (isDragging) {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            var profileIMG = document.getElementById("profile");
            ctx.drawImage(profileIMG , canMouseX, canMouseY );
            ctx.drawImage(img2, 0 , 0);
            ctx.drawImage(img3, 225 , 400);

            var inputedText = $('#inputed').val();
            ctx.fillStyle = "black";
            ctx.font = '20px "微軟正黑體"';
            ctx.fillText(inputedText, 300 , 445);
        }
    }

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });
	/*--------Canvas Setting-----END---------------------------------------------------*/
};

/*--------Post-----START---------------------------------------------------*/
function PostImageToFacebook(e){
	$(".info").append('<img src="img/loading.gif"/>');
	var t=document.getElementById("canvas");
	var n=t.toDataURL("image/png");
	try{
		blob=dataURItoBlob(n)
	}catch(r){
		console.log(r)
	}
	var i=new FormData;
	i.append("access_token",e);
	i.append("source",blob);
	i.append("message","這是HTML5 canvas和Facebook API結合教學");
	try{
		$.ajax({
			url:"https://graph.facebook.com/me/photos?access_token="+e,
			type:"POST",
			data:i,
			processData:false,
			contentType:false,
			cache:false,
			success:function(e){
				console.log("success "+e);
				$(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/"+e.id+" '>Go to Profile Picture</a>] ")
			},error:function(e,t,n){
				$(".info").html("error "+n+" Status "+e.status)
			},complete:function(){
				$(".info").append("Posted to facebook")
			}
		})
	}catch(r){
		console.log(r)
	}
}
function dataURItoBlob(e){
	var t=atob(e.split(",")[1]);
	var n=new ArrayBuffer(t.length);
	var r=new Uint8Array(n);
	for(var i=0;i<t.length;i++){
		r[i]=t.charCodeAt(i)
	}
	return new Blob([n],{type:"image/png"})
}/*
function PostImageToFacebook() {
    var args = {
        method: 'feed',
        name: 'Name : Facebook App',
        message: 'Message : Facebook Post Test',
        link: 'https://developers.facebook.com/docs/reference/dialogs/',
        picture: 'http://www.fbrell.com/f8.jpg',
        caption: 'Caption : Facebook Post Test',
        description: 'Description : Facebook Post Test'
    };
    var body = 'TEST';
    FB.api('/me/feed', 'post', args, function(response) {
		  if (!response || response.error) {
			alert('Error occured');
		  } else {
			alert('Post ID: ' + response.id);
		  }
		});
    //FB.api('/me/feed', 'post', args, onPostToWallCompleted);
    document.getElementById('info').innerHTML = "waiting...";
}

function onPostToWallCompleted(response) {
    if (!response || response.error) {
        document.getElementById('info').innerHTML = 'Error occured: ' + response.error.message;
        $('#info').slideDown();
    } else {
        document.getElementById('info').innerHTML = '發佈成功，訊息ID:' + response.id; //+ "。"<a href="\&quot;javascript:deleteWall(" response.id="">刪除此訊息</a>";
        $('#info').slideDown();
    }
}*/
/*--------Post----END---------------------------------------------------*/

(function (d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




