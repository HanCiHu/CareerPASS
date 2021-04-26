<?php
/*
* 로그인에서 아이디와 비밀번호가 일치하는지 검사
* 로그인이 완료되면 flag 에 OK를 할당해서 이후 로그인되었는지 검사할때 사용
*/
session_start();
$user_id = $_POST['id'];
$user_pw = $_POST['pw'];

if ($user_id == "Edit" && $_SESSION['flag'] == "OK"){
	$user_id = $_SESSION['id'];
}

$json_string = file_get_contents("./data/users/users.json");
$array = (array)json_decode($json_string, true);

$flag = 0;

foreach ($array as $a){
    if ($a['id'] == $user_id && $a['pw'] == $user_pw){
        $flag = 1;
        break;
    }
}

if ($flag){
	echo "YES";
	$_SESSION['id'] = $user_id;
	$_SESSION['flag'] = "OK";
}

else{
	echo "NO";
}
?>