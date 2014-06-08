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
			window.e = accessToken;
			FB.api('/me', function (response) {
				console.log(response);
				console.log('My links is ' + response.link);
				console.log('My Username is ' + response.name);
				console.log('My ID is ' + response.id);
                $(".user_name").html("Hello~" + response.name + " ^______^");
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
    img2.src = "img/frame_1.png"
    
    var img3 = new Image();
    img3.src = "img/frame_2.png"
    
    var img4 = new Image();
    img4.src = "img/frame_3.png"

    var img5 = new Image();
    img5.src = "img/word.png"

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
            profileIMG.crossOrigin = "Anonymous"; // 這務必要做，為了讓Facebook的照片能夠crossdomain傳入到你的頁面，CORS Policy請參考https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image 
			
            ctx.drawImage(profileIMG , canMouseX , canMouseY );

            var inputedText = $('#inputed').val();
            ctx.fillStyle = "black";
            ctx.font = '20px "微軟正黑體"';

            //choose frame
            if(document.getElementById("selectid").value === "frame_1"){
            	ctx.drawImage(img2, 0 , 0);
                ctx.drawImage(img5, 125 , 350 ); //word
                ctx.fillText(inputedText, 160 , 400);
            }
            else if(document.getElementById("selectid").value === "frame_2"){
            	ctx.drawImage(img3, 0 , 0);
                ctx.drawImage(img5, 175 , 325 ); //word
                ctx.fillText(inputedText, 210 , 375);
            }
            else{
            	ctx.drawImage(img4, 0 , 0);
                ctx.drawImage(img5, 100 , 350 ); //word
                ctx.fillText(inputedText, 135 , 400);
            }


            
        }
    }

    function bigimg(){
    	console.log("bigimg");
    // canvas.onmousewheel=canvas.onwheel=function(event){//chrome firefox浏览器兼容
    // var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    // event.wheelDelta=event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
    var profileIMG = document.getElementById("profile");
    console.log("scale = " + profileIMG );
    profileIMG.imgScale *= 2;
    //profileIMG.imgX = profileIMG.imgX * 2 - profileIMG.pos.x;
    //profileIMG.imgY = profileIMG.imgY * 2 - profileIMG.pos.y;
        // imgScale*=2;
        // imgX=imgX*2-pos.x;
        // imgY=imgY*2-pos.y;
    
        // imgScale/=2;
        // imgX=imgX*0.5+pos.x*0.5;
        // imgY=imgY*0.5+pos.y*0.5;
    
    //drawImage();

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

function larger(){
    console.log("large");
    window.fbAsyncInit.bigimg();
}
function render(src){  
        // 创建一个 Image 对象  
        var image = new Image();  
        // 绑定 load 事件处理器，加载完成后执行  
        image.onload = function(){  
            // 获取 canvas DOM 对象  
            var canvas = document.getElementById("canvas");  
            // 如果高度超标  
            if(image.height > MAX_HEIGHT) {  
                // 宽度等比例缩放 *=  
                image.width *= 200 / image.height;  
                image.height = 200;  
            }  
            // 获取 canvas的 2d 环境对象,  
            // 可以理解Context是管理员，canvas是房子  
            var ctx = canvas.getContext("2d");  
            // canvas清屏  
            ctx.clearRect(0, 0, canvas.width, canvas.height);  
            
            // 将图像绘制到canvas上  
            ctx.drawImage(image, 0, 0, image.width, image.height);  
            // !!! 注意，image 没有加入到 dom之中  
        };  
        // 设置src属性，浏览器会自动加载。  
        // 记住必须先绑定事件，才能设置src属性，否则会出同步问题。  
        image.src = src;  
    };  

function uploadimg(files){
    console.log(files[0]);
    console.log(files[0].type);
    if(files[0].type === "image/png" || files[0].type === "image/jpg" || files[0].type === "image/gif" || files[0].type === "image/bmp"){
        // var img= document.getElementById("profile");
        // img = document.getElementById("photo");
        // img.classList.add("obj");
        // img.file = files[0];


        var reader = new FileReader();
        reader.onload = function(e){  
            // 调用前面的 render 函数  
            render(e.target.result);  
        }; 
        //reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; };})(img);
        reader.readAsDataURL(files[0]);
    }
    else{
        alert("Wrong file type. Must be an image type.");
    }
}

/*--------Post-----START---------------------------------------------------*/
function PostImageToFacebook(e) {
	$('.info').append('<img src="img/loading.gif"/>')//載入loading的img
    var canvas = document.getElementById("canvas");//找canvas
    var imageData = canvas.toDataURL("image/png");//把canvas轉換PNG
    try {
        blob = dataURItoBlob(imageData);//把影像載入轉換函數
    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
    var fd = new FormData();
    fd.append("access_token", e);//請思考accesstoken要怎麼傳到這function內
    fd.append("source", blob);//輸入的照片
    fd.append("message", "這是HTML5 canvas和Facebook API結合教學");//輸入的訊息
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + e,//GraphAPI Call
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);//成功log + photoID
                  $(".info").html("Posted Canvas Successfully. [<a href='http://www.facebook.com/" + data.id + " '>Go to Profile Picture</a>] "); //成功訊息並顯示連接
            },
            error: function (shr, status, data) {
                $(".info").html("error " + data + " Status " + shr.status);//如果錯誤把訊息傳到class info內
            },
            complete: function () {
                $(".info").append("Posted to facebook");//完成後把訊息傳到HTML的div內
            }
        });

    } catch (e) {
        console.log(e);//錯誤訊息的log
    }
}

// Convert a data URI to blob把影像載入轉換函數
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {
        type: 'image/png'
    });
}
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




