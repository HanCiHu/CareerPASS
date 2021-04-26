<?php
session_start();
/*
* 게시물을 보는 경우
* 게시판의 테이블 행을 눌러서 정보를 보여주는 경우도 있지만
* 게시물 수정을 위해 값을 받아올때도 사용하므로 edit 변수와 board변수 설정
*/
if (!isset($_SESSION['flag']) || $_SESSION['flag'] == "NO"){
	echo "로그인이 필요합니다.";
}
else{
	echo "OK";
	$_SESSION['No'] = $_POST['No'];
	if (isset($_POST['board'])){
		$_SESSION['edit'] = "on";
		$_SESSION['board'] = $_POST['board'];
	}
}
?>