<?php
/*
* 대외활동 팀원모집 게시판의 게시물을 모두 불러옴
* 대외활동 팀원모집 게시판에서 게시물을 작성할때에 경로를 찾기위해 name변수에 team저장
*/
session_start();
$_SESSION['name'] = 'team';
$json_string = file_get_contents("./data/board/teamPost.json");
echo $json_string;
?>