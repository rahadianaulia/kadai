<?php
class Chance_admin_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
    function listChance(){
		$que = "SELECT chance.id_chance, chance.title, chance.pict, chance.description, chance.start_date, chance.end_date, chance.bonus, chance.total_bonus, (SELECT COUNT(*) FROM log_chance WHERE id_chance=chance.id_chance AND bonus='1') AS jml_chance, (SELECT COUNT(*) FROM log_chance WHERE id_chance=chance.id_chance) AS total_user FROM chance WHERE id_channel IS NULL";
        $query = $this->db->query($que);
        return $query->result();
	}
	
	function saveChance($title, $startdate, $enddate, $bonus, $totalbonus, $pict, $desc){
		$que = "insert into chance values(null, null, '$title', '$pict', '$desc', '$startdate', '$enddate', '$bonus', $totalbonus)";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function editChance($idchance, $title, $startdate, $enddate, $bonus, $totalbonus, $pict, $desc){
		$que = "update chance set title='$title', pict=if('$pict'='',pict,'$pict'), description='$desc', start_date='$startdate', end_date='$enddate', bonus='$bonus', total_bonus=$totalbonus where id_chance=$idchance";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function chanceById($idchance){
		$que = "select * from chance where id_chance=$idchance";
		$query = $this->db->query($que);
        return $query->result();
	}
	
	function deleteChance($idchance){
		$que = "delete from chance where id_chance=$idchance";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function detailLogChance($idchance){
		$que = "SELECT * FROM log_chance WHERE id_chance=$idchance AND bonus='1' order by activity_date desc";
		$query = $this->db->query($que);
        return $query->result();
	}
}
?>