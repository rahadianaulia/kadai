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
        $que = "call sp_register('$username', '$password','$email','$nama','$jekel','$tgllahir')";
        $query = $this->db->query($que);
        return $query->result();
    }

    function login($username, $password){
        $que = "call sp_login('$username','$password')";
        $query = $this->db->query($que);
        return $query->result();
    }
	
	function editProfile($username, $nama, $jeniskelamin, $tanggallahir, $email){
		$que = "update user set nama='$nama', jenis_kelamin='$jeniskelamin', tanggal_lahir='$tanggallahir', email='$email' where username='$username'";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function changePassword($username, $oldPassword, $newPassword){
		$que = "call sp_change_password('$username', '$oldPassword', '$newPassword')";
		$query = $this->db->query($que);
		return $query->result();
	}

}
?>