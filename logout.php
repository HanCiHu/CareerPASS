<?php
session_start();
/*
* 로그아웃을 진행
* 세션을 destroy 해줌
*/
$_SESSION['flag'] = "NO";
session_destroy();
?>