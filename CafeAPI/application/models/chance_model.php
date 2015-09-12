<?php
class Chance_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function listChance(){
		$que = "SELECT chance.id_chance, chance.id_channel, channel.nama_channel, chance.title, chance.pict, chance.description, chance.start_date, chance.end_date, chance.bonus, chance.total_bonus FROM chance LEFT JOIN channel ON chance.id_channel=channel.id_channel where chance.start_date<=curdate() and chance.end_date>=curdate()";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function detailChance($idchance){
		$que = "SELECT chance.id_chance, chance.id_channel, channel.nama_channel, channel.logo, chance.title, chance.pict, chance.description, chance.start_date, chance.end_date, chance.bonus, chance.total_bonus FROM chance LEFT JOIN channel ON chance.id_channel=channel.id_channel where chance.id_chance=$idchance";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function checkActivity($username, $idchance){
		$que = "CALL sp_check_log_chance('$username', $idchance)";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function writeLog($username, $idchance, $bonus){
		$que = "CALL sp_write_log('$username', $idchance, '$bonus');";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function expiredBonus($idlog){
		$que = "update log_chance set valid='false' where id_log=$idlog";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
}
?>