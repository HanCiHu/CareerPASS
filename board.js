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

window.onload = function(){
	/*
	* 로그인이 되었는지 확인
	* 로그인이 되었다면 로그인 버튼 대신 아이디 + 로그아웃 버튼 생성
	*/
	$.ajax({
		url:'./check_login.php',
		type:'post'
	}).done(function(data) {
		if (data == "NO"){

		}
		else{
			$("#sign-btn").html("<a class=\"btn btn-dark\" id=\"logout-btn\" onclick=\"logout()\">로그아웃</a>");
			$("#id-span").text(data+"님 환영합니다");
		}
	});

	/*
	* 자유게시판인 경우
	* 한번에 5개의 게시물만 보여줌
	* 각 게시물은 고유 번호, 제목 ,작성자, 작성 날짜를 보여줌
	* 최대 5개의 pagination
	* 전체 게시물이 25개 이하인 경우 게시물의 수만큼 pagination 동적 추가
	*/
	if (window.location.href == "http://localhost/TP/freeBoard.html"){
		$.ajax({
			url:'./freeBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = json_data.length / 5;
			sessionStorage.setItem("free",1);
			$("#freePage").append('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
			for (var i = 0; i < pagination && i < 5; i++){
				$("#freePage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
			}
			$("#freePage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			for (var i = 0; i < json_data.length && i < 5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("freeBoard").appendChild(tr);
			}
		});
	}
	/*
	* 대외활동 후기 게시판의 경우
	* 한번에 5개의 게시물만 보여줌
	* 각 게시물은 고유 번호, 제목 ,작성자, 작성 날짜를 보여줌
	* 최대 5개의 pagination
	* 전체 게시물이 25개 이하인 경우 게시물의 수만큼 pagination 동적 추가
	*/
	else if (window.location.href == "http://localhost/TP/reviewBoard.html"){
		$.ajax({
			url:'./reviewBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = json_data.length / 5;
			sessionStorage.setItem("review",1);
			$("#reviewPage").append('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
			for (var i = 0; i < pagination && i < 5; i++){
				$("#reviewPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
			}
			$("#reviewPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			for (var i = 0; i < json_data.length && i < 5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("reviewBoard").appendChild(tr);
			}
		});

	}
	/*
	* 대외활동 팀원 모집 게시판인 경우
	* 한번에 5개의 게시물만 보여줌
	* 각 게시물은 고유 번호, 제목 ,작성자, 작성 날짜를 보여줌
	* 최대 5개의 pagination
	* 전체 게시물이 25개 이하인 경우 게시물의 수만큼 pagination 동적 추가
	*/
	else if (window.location.href == "http://localhost/TP/teamBoard.html"){
		$.ajax({
			url:'./teamBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = json_data.length / 5;
			sessionStorage.setItem("team",1);
			$("#teamPage").append('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
			for (var i = 0; i < pagination && i < 5; i++){
				$("#teamPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
			}
			$("#teamPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			for (var i = 0; i < json_data.length && i < 5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("teamBoard").appendChild(tr);
			}
		});
	}

}
/*
* 게시물을 클릭했을때 실행되는 함수
* 먼저 로그인이 되어있는지를 확인하고 로그인이 되어있지 않다면 경고메세지 출력
* 로그인이 되어있다면 세션에 해당 게시물의 고유번호 저장
*/
function viewPost(id){
	$.ajax({
		url:'./post.php',
		type:'post',
		data: {
			No:id
		}
	}).done(function(data) {
		if (data == "OK"){
			location.href = "./post.html";
		}
		else{
			alert(data);
		}
	});
}
/*
* pagination을 클릭하는 경우
* 첫번째 페이지에서 왼쪽 화살표를 클릭하는 경우 경고메세지 출력
* 마지막 페이지에서 오른쪽 화살표를 클릭하는 경우 경고메세지 출력
* 게시판 게시물이 25개 이상(pagination 5개 이상)인 경우 클릭한 페이지를 가운데로 이동하고 최대 pagination또는 5개의 paginaion 추가
* 각 게시판마다 동작하는 원리는 같음
*/
function movePage(n) {
	if (window.location.href == "http://localhost/TP/reviewBoard.html"){
		$.ajax({
			url:'./reviewBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = parseInt(json_data.length / 5) + 1;
			if (json_data.length % 5 == 0){
				pagination -= 1;
			}

			if (n == 'post'){
				n = Number(sessionStorage.getItem('review')) - 1;
			}
			else if(n == 'next'){
				n = Number(sessionStorage.getItem('review')) + 1;
			}
			if (n > pagination){
				alert("이미 마지막 페이지 입니다.");
				return;
			}
			if (n <= 0){
				alert("이미 첫번째 페이지 입니다.");
				return;
			}
			if (n > 3){
				$("#reviewPage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
				for (var i = n - 3; i < n + 2 && i < pagination; i++){
					$("#reviewPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
				}
				$("#reviewPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			else{
				$("#reviewPage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
			for (var i = 0; i < pagination && i < 5; i++){
				$("#reviewPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
			}
			$("#reviewPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			$("#reviewBoard").html('');
			for (var i = (n-1)*5; i < json_data.length && i < n*5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("reviewBoard").appendChild(tr);
			}
			sessionStorage.setItem("review",n);
		});
	}
	else if (window.location.href == "http://localhost/TP/teamBoard.html"){
		$.ajax({
			url:'./teamBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = parseInt(json_data.length / 5) + 1;
			if (json_data.length % 5 == 0){
				pagination -= 1;
			}
			if (n == 'post'){
				n = Number(sessionStorage.getItem('team')) - 1;
			}
			else if(n == 'next'){
				n = Number(sessionStorage.getItem('team')) + 1;
			}
			if (n > pagination){
				alert("이미 마지막 페이지 입니다.");
				return;
			}
			if (n <= 0){
				alert("이미 첫번째 페이지 입니다.");
				return;
			}
			if (n > 3){
				$("#teamPage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
				for (var i = n - 3; i < n + 2 && i < pagination; i++){
					$("#teamPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
				}
				$("#teamPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			else{
				$("#teamPage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
				for (var i = 0; i < pagination && i < 5; i++){
					$("#teamPage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
				}
				$("#teamPage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			$("#teamBoard").html('');
			for (var i = (n-1)*5; i < json_data.length && i < n*5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("teamBoard").appendChild(tr);
			}
			sessionStorage.setItem("team",n);
		});
	}

	else if (window.location.href == "http://localhost/TP/freeBoard.html"){
		$.ajax({
			url:'./freeBoard.php',
			type:'post'
		}).done(function(data) {
			var json_data = JSON.parse(data);
			var pagination = parseInt(json_data.length / 5) + 1;
			if (json_data.length % 5 == 0){
				pagination -= 1;
			}
			if (n == 'post'){
				n = Number(sessionStorage.getItem('free')) - 1;
			}
			else if(n == 'next'){
				n = Number(sessionStorage.getItem('free')) + 1;
			}
			if (n > pagination){
				alert("이미 마지막 페이지 입니다.");
				return;
			}
			if (n <= 0){
				alert("이미 첫번째 페이지 입니다.");
				return;
			}
			if (n > 3){
				$("#freePage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
				for (var i = n - 3; i < n + 2 && i < pagination; i++){
					$("#freePage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
				}
				$("#freePage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			else{
				$("#freePage").html('<li class="page-item"><a class="page-link" id="post" onclick="movePage(`post`)">◀</a></li>');
				for (var i = 0; i < pagination && i < 5; i++){
					$("#freePage").append('<li class="page-item"><a class="page-link" onclick="movePage('+(i+1)+')">'+(i+1)+'</a></li>');
				}
				$("#freePage").append('<li class="page-item"><a class="page-link" id="next" onclick="movePage(`next`)">▶</a></li>');
			}
			$("#freeBoard").html('');
			for (var i = (n-1)*5; i < json_data.length && i < n*5; i++){
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				td1.innerText = json_data[i]['No'];
				var td2 = document.createElement("td");
				td2.innerText = json_data[i]['title'];
				var td3 = document.createElement("td");
				if (json_data[i]['flag'] == "true"){
					td3.innerText = "익명";
				}
				else{
					td3.innerText = json_data[i]['user'];
				}
				var td4 = document.createElement("td");
				td4.innerText = json_data[i]['date'];
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.setAttribute("id",json_data[i]['No']);
				tr.setAttribute("onclick","viewPost("+json_data[i]['No']+")");
				document.getElementById("freeBoard").appendChild(tr);
			}
			sessionStorage.setItem("free",n);
		});
	}
}