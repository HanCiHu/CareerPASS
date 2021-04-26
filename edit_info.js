/*
* 로그인이 되었는지 확인
* 로그인이 되었다면 로그인 버튼 대신 아이디 + 로그아웃 버튼 생성
*/
window.onload = function(){
	$.ajax({
		url:'./check_login.php',
		type:'post'
	}).done(function(data) {
		if (data == "NO"){
			alert("로그인이 필요합니다.");
			location.href="./signIn.html";
		}
		else{
			$("#sign-btn").html("<a class=\"btn btn-dark\" id=\"logout-btn\" onclick=\"logout()\">로그아웃</a>");
			$("#id-span").text(data+"님 환영합니다");
			$("#idDiv").text(data+"님 정보변경");
		}
	});
}
/*
* 로그아웃 함수
* 세션 destroy 해준 후 로그인 화면으로 이동
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
/*
* 정보 변경 첫번째 페이지
* 접속 아이디와 정보변경을 위해 입력한 비밀번호가 동일한지 확인
* 동일하다면 다음페이지 생성
*/
function editInfo() {
	var pw = $('#editPW').val();

	$.ajax({
		url:'./signIn.php',
		type:'post',
		data: {
			id: "Edit",
			pw: pw
		}
	}).done(function(data){
		if (data == "YES"){
			$("#editInfo").html("비밀번호 : <input type='password' id='pw1'> <br><br>비밀번호 확인 : <input type='password' id='pw2'> <br><br> <button onclick='editPW()' class='btn btn-outline-info'>변경하기</button>");
		}
		else if(data == "NO"){
			alert("비밀번호가 일치하지 않습니다.");
		}
	});
}
/*
* 정보 변경(비밀번호 변경)
* 변경할 비밀번호와 확인 비밀번호가 서로 같은지 확인
* 두개의 비밀번호가 같다면 edit_info.php에서 비밀번호 변경
* 변경 이후에 로그아웃 한 후 로그인 화면으로 이동
*/
function editPW() {
	var pw1 = $("#pw1").val();
	var pw2 = $("#pw2").val();
	if (!(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/.test(pw1) && /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/.test(pw2))){
		alert("패스워드가 입력형식에 맞지 않습니다.");
		return ;
	}
	if (pw1 != pw2){
		alert("비밀번호가 서로 일치하지 않습니다.");
		return;
	}
	$.ajax({
		url:'./edit_info.php',
		type:'post',
		data: {
			pw: pw1
		}
	}).done(function(data) {
		alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
		$.ajax({
			url:'./logout.php',
			type:'post'
		}).done(function(data) {
			location.href="./signIn.html";
		});
	});
}