<?php
session_start();
/*
* 게시물 작성하는 경우
* ajax에서 전송받은 데이터와
* name변수에 저장되어있는 값을 이용해 해당 게시판 json파일에 데이터 저장
*/
$file = "./data/board/".$_SESSION['name']."Post.json";

if (isset($_SESSION['name']) && $_SESSION['flag'] == "OK"){
	$json_string = file_get_contents($file);
	$array = (array)json_decode($json_string, true);
	$content = array("No"=>$array[0]['No']+1, "title"=>$_POST['title'], "user"=>$_SESSION['id'], "flag"=> $_POST['flag'], "date"=>$_POST["date"], "content"=>$_POST['content']);
	array_unshift($array, $content);
	$json = json_encode($array);
	file_put_contents($file, $json);
	echo $_SESSION['name'];
}
else{
	echo "Error";
}
?>
