/*
* 게시글 작성 함수
* 현재 어디 게시판을 보고있는지는 세션에 저장되어있으므로
* 이것을 이용해서 json파일에 정보 추가
* 게시글 추가 이후 원래 보고있던 게시판으로 이동
*/
function writePost() {
	var today = new Date();
	$.ajax({
		url:'./writePost.php',
		type:'post',
		data : {
			write : 1,
			title : $('#post-title').val(),
			content : $("#content").val(),
			date : today.getFullYear()+"."+today.getMonth()+"."+today.getDate(),
			flag: $("#hide-user").is(":checked"),
		}
	}).done(function(data) {
		if(data == "free"){
			location.href = "./freeBoard.html";
		}
		else if(data == "review"){
			location.href = "./reviewBoard.html";
		}
		else if (data == "team"){
			location.href = "./teamBoard.html";
		}
		else{
			alert("세션이 만료되었습니다.");
			location.href="./signIn.html"
		}
	});
}
/*
* 로그인 확인
*/
window.onload = function(){
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