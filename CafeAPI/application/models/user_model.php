<?php
class User_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
    function getUserInfo($username){
        $que = "select * from user where username = '$username'";
        $query = $this->db->query($que);
        return $query->result();
    }

    function register ($username, $password, $email, $nama, $jekel, $tgllahir){
		$encriptPass = md5($username.$password);
        $que = "call sp_register('$username', '$encriptPass','$email','$nama','$jekel','$tgllahir')";
        $query = $this->db->query($que);
        return $query->result();
    }

    function login($username, $password){
		$encriptPass = md5($username.$password);
        $que = "call sp_login('$username','$encriptPass')";
        $query = $this->db->query($que);
        return $query->result();
    }
	
	function editProfile($username, $nama, $jeniskelamin, $tanggallahir, $email){
		$que = "update user set nama='$nama', jenis_kelamin='$jeniskelamin', tanggal_lahir='$tanggallahir', email='$email' where username='$username'";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function changePassword($username, $oldPassword, $newPassword){
		$encriptNewPass = md5($username.$newPassword);
		$encriptOldPass = md5($username.$oldPassword);
		$que = "call sp_change_password('$username', '$encriptOldPass', '$encriptNewPass')";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function changeAva($username, $filename){
		$que = "update user set avatar='$filename' where username='$username'";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function removeAva($username){
		$que = "CALL sp_remove_avatar('$username')";
		$query = $this->db->query($que);
		return $query->result();
	}

}
?>