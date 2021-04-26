<?php
session_start();
$user_id = $_SESSION['id'];
$user_pw = $_POST['pw'];

$json_string = file_get_contents("./data/users/users.json");
$array = (array)json_decode($json_string, true);

$flag = 0;
$index = 0;
/*
* foreach문 내부에서 array값을 고치면 foreach문을 빠져나왔을때
* 값이 고쳐지지 않은 상태 그대로로 변함
* 따라서 index 변수를 이용해서 해당 아이디가 있는 배열의 인덱스를 반환
*/
foreach ($array as $a){
    if ($a['id'] == $user_id){
		$flag = 1;
        break;
	}
	$index++;
}

$array[$index]['pw'] = $user_pw;
/*
* 혹시 아이디를 못찾은 경우 예외처리
*/
if ($flag){
	$json = json_encode($array);
	$byte = file_put_contents("./data/users/users.json", $json);
}
?>