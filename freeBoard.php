<?php
/*
* 자유 게시판의 게시물을 모두 불러옴
* 자유 게시판에서 게시물을 작성할때에 경로를 찾기위해 name변수에 free저장
*/
session_start();
$_SESSION['name'] = 'free';
$json_string = file_get_contents("./data/board/freePost.json");
echo $json_string;
?>