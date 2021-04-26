/*
* 로그인 함수
* 먼저 아이디와 비밀번호가 입력 형식에 맞는지 확인
* 맞지않으면 경고창 발생
* 맞는 경우 signIn.php에서 아이디와 비밀번호가 일치하는지 확인
*/
function signIn(){
	var id = $('#signIn_id').val();
	var pw = $('#signIn_pw').val();

	if (!(/^([A-Za-z0-9]){6,15}/.test(id) && /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/.test(pw))){
		alert("아이디 또는 패스워드가 입력형식에 맞지 않습니다.");
		return ;
	}

	$.ajax({
		url:'./signIn.php',
		type:'post',
		data: {
			id: id,
			pw: pw
		}
	}).done(function(data){
		//로그인 성공 한 경우 board.html로 이동
		if (data == "YES"){
			location.href="./freeBoard.html";
		}
		//로그인 실패 한 경우 경고창 발생
		else if(data == "NO"){
			alert("아이디 또는 비밀번호가 일치하지 않습니다.");
		}
	});
}
/*
* 회원가입 함수
* 아이디와 비밀번호가 형식에 맞는지 확인
* 맞는경우 signUp.php에서 회원가입 진행
* 아이디가 이미 존재하는 경우 예외처리
*/
function signUp() {
	var id = $('#signUp_id').val();
	var pw = $('#signUp_pw').val();

	if (!(/^([A-Za-z0-9]){6,15}/.test(id) && /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*/.test(pw))){
		alert("아이디 또는 패스워드가 입력형식에 맞지 않습니다.");
		return ;
	}

	$.ajax({
		url:'./signUp.php',
		type:'post',
		data: {
			id: id,
			pw: pw
		}
	}).done(function(data) {
		if (data == "YES"){
			alert("회원가입이 완료되었습니다.");
			location.href="./signIn.html";
		}
		else if(data == "NO"){
			alert("아이디가 이미 존재합니다.");
		}
	});
}