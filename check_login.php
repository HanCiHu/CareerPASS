<?php
/*
* 로그인을 할때 로그인이 되는 경우
* flag에 OK를 저장해서 로그인이 되었는지 확인 가능하게 구현
*/
session_start();
if($_SESSION['flag'] == 'OK'){
	echo $_SESSION['id'];
}
else{
	echo "NO";
}
?>