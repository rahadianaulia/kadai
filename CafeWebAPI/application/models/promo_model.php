<?php
class Promo_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
    function getPromo(){
		$que = "select * from promo order by id_promo desc";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function getDetailPromo($id){
		$que = "select * from promo where id_promo=$id";
        $query = $this->db->query($que);
        return $query->result();
	}
}
?>