function FacebookLogin(){
	FB.login(function(e){
		if(e.authResponse){
			FB.api("/me",function(e){
				window.authToken=e.authResponse.accessToken
			});
			setTimeout(function(){
				window.location.reload()
			},1e3)
		}
	},{scope:"user_likes,user_photos,publish_actions"})
}

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
		$.ajax({url:"https://graph.facebook.com/me/photos?access_token="+e,type:"POST",data:i,processData:false,contentType:false,cache:false,
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
}

window.fbAsyncInit=function(){
	function l(e){
		canMouseX=parseInt(e.clientX-s);
		canMouseY=parseInt(e.clientY-o);
		f=true
	}
	function c(e){
		canMouseX=parseInt(e.clientX-s);
		canMouseY=parseInt(e.clientY-o);
		f=false
	}
	function h(e){
		canMouseX=parseInt(e.clientX-s);
		canMouseY=parseInt(e.clientY-o)
	}
	function p(r){
		canMouseX=parseInt(r.clientX-s);
		canMouseY=parseInt(r.clientY-o);
		if(f){
			e.clearRect(0,0,u,a);
			var i=document.getElementById("preview1");
			e.drawImage(i,canMouseX-128/2,canMouseY-120/2);
			e.drawImage(n,200,400);
			e.drawImage(t,0,0);
			var l=$("#inputed").val();
			e.fillStyle="black";
			e.font='20px "微軟正黑體"';
			e.fillText(l,275,445)
		}
	}
	FB.init({appId:"566549573460943",status:true,cookie:true,xfbml:true,version:"v1.0"});
	FB.getLoginStatus(function(e){
		if(e.status==="connected"){
			window.authToken=e.authResponse.accessToken;
			FB.api("/me/picture?type=large",function(e){
				console.log(e);
				$("#preview1").attr("src",e.data.url)
			})
		}else if(e.status==="not_authorized"){
			$("#main").html("<h1>Please authorized this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
			$("#facebookname,#Sent,label,#sentimg").remove();
			FacebookLogin()
		}else{
			$("#main").html("<h1>Please login to use this apps</h1><h4> p/s: please allow browser popup for this website and refresh to use this apps</h4>");
			$("#facebookname,#Sent,label,#sentimg").remove();
			FacebookLogin()
		}
	});
	var e=document.getElementById("canvas").getContext("2d");
	e.font='20px "Arial"';
	e.fillText("Move here to start fill with Facebook Profile Picture",40,270);

	var t=new Image;
	t.src="img/overlayback.png";

	var n=new Image;
	n.src="img/typography.png";

	var r=document.getElementById("canvas");

	var e=r.getContext("2d");

	var i=$("#canvas").offset();

	var s=i.left;

	var o=i.top;

	var u=r.width;

	var a=r.height;

	var f=false;
	$("#canvas").mousedown(function(e){
		l(e)
	});
	$("#canvas").mousemove(function(e){
		p(e)
	});
	$("#canvas").mouseup(function(e){
		c(e)
	});
	$("#canvas").mouseout(function(e){
		h(e)
	})
};
(function(e,t,n){
	var r,i=e.getElementsByTagName(t)[0];
	if(e.getElementById(n)){
		return
	}
	r=e.createElement(t);
	r.id=n;
	r.src="//connect.facebook.net/en_US/all.js";
	i.parentNode.insertBefore(r,i)
})
(document,"script","facebook-jssdk")












