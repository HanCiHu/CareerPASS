window.onload = function(){
	let user_id;
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
			return;
		}
		else{
			user_id = data;
			$("#sign-btn").html("<a class=\"btn btn-dark\" id=\"logout-btn\" onclick=\"logout()\">로그아웃</a>");
			$("#id-span").text(data+"님 환영합니다");
			$("#idDiv").text(data+"님 정보변경");
		}
	});
	/*
	* 작성 글 목록에서는 게시판의 종류와 관계없이 모든 게시판에서 정보를 가져와야함
	* 각각의 게시판에서 해당 아이디가 작성한 글 목록을 불러옴
	* 이후 버튼을 이용해 수정 or 삭제를 할수있게 버튼 생성
	*/
	$.ajax({
		url:'./freeBoard.php',
		type:'post'
	}).done(function(data) {
		var json_data = JSON.parse(data);
		for (var i = 0; i < json_data.length; i++){
			if (json_data[i]['user'] != user_id){
				continue;
			}
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.innerText = json_data[i]['No'];
			var td2 = document.createElement("td");
			td2.innerText = json_data[i]['title'];
			var td3 = document.createElement("td");
			td3.innerText = "free";
			var td4 = document.createElement("td");
			td4.innerText = json_data[i]['date'];
			var edit = document.createElement("button");
			edit.setAttribute("onclick",'edit("free",'+json_data[i]['No']+')');
			edit.setAttribute("class","btn btn-outline-outline");
			edit.innerText = "수정";
			var del = document.createElement("button");
			del.setAttribute("onclick",'del("free",'+json_data[i]['No']+')');
			del.setAttribute("class","btn btn-outline-outline");
			del.innerText = "삭제";
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			var td5 = document.createElement("td");
			var td6 = document.createElement("td");
			td5.appendChild(edit);
			td6.appendChild(del);
			tr.appendChild(td5);
			tr.appendChild(td6);
			document.getElementById("myposts").appendChild(tr);
		}
	});

	$.ajax({
		url:'./reviewBoard.php',
		type:'post'
	}).done(function(data) {
		var json_data = JSON.parse(data);
		for (var i = 0; i < json_data.length; i++){
			if (json_data[i]['user'] != user_id){
				continue;
			}
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.innerText = json_data[i]['No'];
			var td2 = document.createElement("td");
			td2.innerText = json_data[i]['title'];
			var td3 = document.createElement("td");
			td3.innerText = "review";
			var td4 = document.createElement("td");
			td4.innerText = json_data[i]['date'];
			var edit = document.createElement("button");
			edit.setAttribute("onclick",'edit("review",'+json_data[i]['No']+')');
			edit.setAttribute("class","btn btn-outline-outline");
			edit.innerText = "수정";
			var del = document.createElement("button");
			del.setAttribute("onclick",'del("review",'+json_data[i]['No']+')');
			del.setAttribute("class","btn btn-outline-outline");
			del.innerText = "삭제";
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			var td5 = document.createElement("td");
			var td6 = document.createElement("td");
			td5.appendChild(edit);
			td6.appendChild(del);
			tr.appendChild(td5);
			tr.appendChild(td6);
			document.getElementById("myposts").appendChild(tr);
		}
	});
	$.ajax({
		url:'./teamBoard.php',
		type:'post'
	}).done(function(data) {
		var json_data = JSON.parse(data);
		for (var i = 0; i < json_data.length; i++){
			if (json_data[i]['user'] != user_id){
				continue;
			}
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.innerText = json_data[i]['No'];
			var td2 = document.createElement("td");
			td2.innerText = json_data[i]['title'];
			var td3 = document.createElement("td");
			td3.innerText = "team";
			var td4 = document.createElement("td");
			td4.innerText = json_data[i]['date'];
			var td5 = document.createElement("td");
			var td6 = document.createElement("td");
			var edit = document.createElement("button");
			edit.setAttribute("onclick",'edit("team",'+json_data[i]['No']+')');
			edit.setAttribute("class","btn btn-outline-outline");
			edit.innerText = "수정";
			var del = document.createElement("button");
			del.setAttribute("onclick",'del("team",'+json_data[i]['No']+')');
			del.setAttribute("class","btn btn-outline-outline");
			del.innerText = "삭제";
			td5.appendChild(edit);
			td6.appendChild(del);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			tr.appendChild(td5);
			tr.appendChild(td6);
			document.getElementById("myposts").appendChild(tr);
		}
	});
}
/*
* 작성 글 목록에서 수정 버튼을 클릭한 경우
* post.php에서 세션변수 edit을 이용해 수정할것을 알려주고
* 게시물 수정에 필요한 정보를 세션에 저장
*/
function edit(board, No) {
	$.ajax({
		url: "./post.php",
		type:'post',
		data:{
			No :No,
			board : board
		}
	}).done(function(data) {
		location.href = "./editPost.html";
	});
}
/*
* 삭제버튼을 클릭하면 정말로 삭제하시겠습니까 라는 메세지 출력
* 확인을 누르면 삭제 진행
* 삭제 후 페이지 reload
*/
function del(board, num) {
	var conf = confirm("정말로 삭제하시겠습니까?");
	if (conf){
		alert("삭제되었습니다.");
		$.ajax({
			url: "./delPost.php",
			type:'post',
			data:{
				num :num,
				board : board
			}
		}).done(function(data) {
			location.reload();
		});
	}
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