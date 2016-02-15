<?php
class Dashboard_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	//============================== DASHBOARD ADMIN ==========================================
	function totalUser(){
		$que = "select count(*) as total_user from user";
		$query = $this->db->query($que);
		return $query->result();
	}
    
	function totalChannel(){
		$que = "select count(*) as total_channel from channel";
		$query = $this->db->query($que);
		return $query->result();
	}
}
?>