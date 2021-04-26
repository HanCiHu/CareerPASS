window.onload = function(){
	/*
	* 로그인 확인
	*/
	$.ajax({
		url:'./check_login.php',
		type:'post'
	}).done(function(data) {
		if (data == "NO"){
			alert("로그인이 필요합니다.");
			location.href="./signIn.html";
			return ;
		}
		else{
			$("#sign-btn").html("<a class=\"btn btn-dark\" id=\"logout-btn\" onclick=\"logout()\">로그아웃</a>");
			$("#id-span").text(data+"님 환영합니다");
			/*
			* 로그인이 되어있다면 viewPost.php에서 수정하려고 하는 게시물의 정보를 받아옴
			* 정보를 받아온 후 input의 기본값으로 각각 설정
			* 강제로 url을 이용해 들어온 경우 경고 메세지 출력
			*/
			$.ajax({
				url:'./viewPost.php',
				type:'post'
			}).done(function(data) {
				if (data == "Error"){
					alert("유효하지 않은 접근입니다.");
					window.history.back();
				}
				else{
					var postData = JSON.parse(data);
					$("#post-title").attr("value",postData[0]['title']);
					$("#content").text(postData[0]['content']);
					if (postData[0]['flag'] == "true"){
						$("#hide-user").attr("checked","checked");
					}
				}
			});
		}
	});
}
/*
* 올바른 경로로 들어오지 않은경우 예외처리
* 올바른 경로로 들어온 경우 editPost.php에서 게시물 수정
*/
function editPost() {
	$.ajax({
		url:'./editPost.php',
		type:'post',
		data:{
			title : $('#post-title').val(),
			content : $("#content").val(),
			flag: $("#hide-user").is(":checked"),
		}
	}).done(function(data) {
		if (data == "Error"){
			alert("유효하지 않은 접근입니다.");
			window.history.back();
		}
		else{
			alert("수정이 완료되었습니다.");
			location.href="./myPosts.html";
		}

	});
}
/*
* 로그아웃 함수
*/
function logout() {
	$.ajax({
		url:'./logout.php',
		type:'post'
	}).done(function(data) {
		alert("로그아웃이 되었습니다.");
		location.href="./signIn.html";
	});
}