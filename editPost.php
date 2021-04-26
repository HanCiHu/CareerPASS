<?php
session_start();
/*
* 로그인이 안되어 있는경우
* No가 0 이하인경우 (게시물 보는 페이지를 나가면 0으로 초기화 하게 구현)
* board 변수에 값이 저장되어 있지 않은경우
* 예외처리
*/
if ($_SESSION['No'] <= 0 || $_SESSION['flag'] != "OK" || !isset($_SESSION['board'])){
	echo "Error";
}

else{
	$index = 0;
	$file = "./data/board/".$_SESSION['board']."Post.json";
	$json_string = file_get_contents($file);
	$array = (array)json_decode($json_string, true);
	foreach ($array as $a){
		if ($a['No'] == $_SESSION['No']){
			break;
		}
		$index++;
	}
	$array[$index]['title'] = $_POST['title'];
	$array[$index]['content'] = $_POST['content'];
	$array[$index]['flag'] = $_POST['flag'];
	$json = json_encode($array);
	file_put_contents($file, $json);
	$_SESSION['No'] = 0;
	$_SESSION['edit'] ="OFF";
}
?>