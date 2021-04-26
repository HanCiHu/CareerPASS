<?php
/*
* 회원가입 진행
* users.json에서 아이디가 있는지 확인
* 없으면 정보를 저장
* 있으면 경고 메세지 발생
*/
$user_id = $_POST['id'];
$user_pw = $_POST['pw'];

$json_string = file_get_contents("./data/users/users.json");
$array = (array)json_decode($json_string, true);

$flag = 1;

foreach ($array as $a){
    if ($a['id'] == $user_id){
        $flag = 0;
        break;
    }
}

if ($flag){
    $content = Array("id"=>$user_id, "pw"=>$user_pw);
    array_push($array,$content);
    $json = json_encode($array);
    $byte = file_put_contents("./data/users/users.json", $json);
    echo "YES";
}
else{
    echo "NO";
}
?>