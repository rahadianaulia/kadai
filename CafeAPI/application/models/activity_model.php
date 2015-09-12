<?php
class Activity_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function viewActivity($username){
		$que = "SELECT history_point.id, history_point.username, history_point.id_channel, IFNULL(channel.nama_channel, 'MyCafe') AS nama_channel, history_point.activity, history_point.dk, history_point.date_activity, history_point.point FROM history_point LEFT JOIN channel ON history_point.id_channel=channel.id_channel WHERE history_point.username='$username' ORDER BY history_point.date_activity DESC";
		$query = $this->db->query($que);
		return $query->result();
	}
}
?>