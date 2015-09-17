<?php
class Promo_admin_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function listPromo(){
		$que = "select * from promo order by id_promo desc";
        $query = $this->db->query($que);
        return $query->result();
	}
	
	function editPromo($idpromo, $namapromo, $awalpromo, $akhirpromo, $pict, $content, $shortdesc){
		$content = $this->db->escape_str($content);
		$shortdesc = $this->db->escape_str($shortdesc);
		$que = "update promo set nama_promo='$namapromo', awal_promo='$awalpromo', akhir_promo='$akhirpromo', pict=if('$pict'='',pict,'$pict'), content='$content', short_desc='$shortdesc' where id_promo=$idpromo";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function getPromoById($idpromo){
		$que = "select * from promo where id_promo=$idpromo";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function addPromo($namapromo, $awalpromo, $akhirpromo, $pict, $content, $shortdesc){
		$content = $this->db->escape_str($content);
		$shortdesc = $this->db->escape_str($shortdesc);
		$que = "insert into promo values(null, '$namapromo', curdate(), '$awalpromo', '$akhirpromo', '$pict', '$content', '$shortdesc')";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function deletePromo($idpromo){
		$que = "delete from promo where id_promo=$idpromo";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
    
}
?>