window.onload = function(){
	/*
	* 로그인 함수
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
		}
	});
	/*
	* 게시물을 보려고 접근을 했을때 유효하지 않은 경로로 들어온 경우 예외처리
	* viewPost.php에서 해당 게시물의 정보를 받아와서 post.html에 보여줌
	* 익명으로 체크된 경우 게시물 작성자의 아이디가 아닌 익명으로 표시
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
			$("#postTitle").text(postData[0]['title']);
			$("#postDate").text("글 작성일 : "+postData[0]['date']);
			if (postData[0]['flag'] == "true"){
				$("#postUser").text("글 작성자 : 익명");
			}
			else{
				$("#postUser").text("글 작성자 : "+postData[0]['user']);
			}
			$("#postContent").text(postData[0]['content']);
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