<?php
class Point_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function viewPoint($username){
		$que = "select point, total_point from user where username='$username'";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function changePoint($username, $point, $idchannel){
		$que = "CALL sp_change_point('$username', $point, $idchannel)";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function addPoint($username, $coupon){
		$que = "CALL sp_add_point('$username', '$coupon')";
		$query = $this->db->query($que);
		return $query->result();
	}
}
?>