<?php
/*
* 열람하고자 하는 게시물의 정보를 찾아서 js파일에 전송
* 현재 게시판은 name변수 or board변수 에 저장되어있고
* 고유 번호는 POST로 전송 되므로 이를 이용해 정보 검색
*/
session_start();
if ($_SESSION['No'] <= 0 || $_SESSION['flag'] != "OK"){
	echo "Error";
}

else{
	if ($_SESSION['edit']== 'on'){
		$file =  "./data/board/".$_SESSION['board']."Post.json";
	}
	else{
		$file = "./data/board/".$_SESSION['name']."Post.json";
	}
	$json_string = file_get_contents($file);
	$array = (array)json_decode($json_string, true);
	$ret = array();
	foreach($array as $a){
		if ($a['No'] == $_SESSION['No']){
			array_push($ret, $a);
			break;
		}
	}
	$json = json_encode($ret);
	echo $json;
	if ($_SESSION['edit'] != "on"){
		$_SESSION['No'] = 0;
	}
}
?>