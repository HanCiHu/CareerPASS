<?php
/*
* 게시물 삭제
* ajax에서 게시판의 종류와 고유번호를 넘겨준다.
* 이 2가지 정보만 있으면 어떤 게시물인지 알수있으므로 해당 게시물 삭제
*/
session_start();
$file = "./data/board/".$_POST['board']."Post.json";
$json_string = file_get_contents($file);
$array = (array)json_decode($json_string, true);

for ($i = 0; $i < count($array); $i++){
	if ($array[$i]['No'] == $_POST['num']){
		unset($array[$i]);
		$array = array_values($array);
		$json = json_encode($array);
		file_put_contents($file, $json);
		echo"삭제되었습니다.";
		break;
	}
}
?>