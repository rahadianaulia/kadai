<?php
class Promo_channel_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function listPromo($idchannel){
		$que = "select * from promo_channel where id_channel=$idchannel order by id_promo desc";
        $query = $this->db->query($que);
        return $query->result();
	}
	
	function editPromo($idpromo, $namapromo, $awalpromo, $akhirpromo, $pict, $content, $shortdesc){
		$content = $this->db->escape_str($content);
		$shortdesc = $this->db->escape_str($shortdesc);
		$que = "update promo_channel set nama_promo='$namapromo', awal_promo='$awalpromo', akhir_promo='$akhirpromo', pict=if('$pict'='',pict,'$pict'), content='$content', short_desc='$shortdesc' where id_promo=$idpromo";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function getPromoById($idpromo, $idchannel){
		$que = "select * from promo_channel where id_promo=$idpromo and id_channel=$idchannel";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function addPromo($idchannel, $namapromo, $awalpromo, $akhirpromo, $pict, $content, $shortdesc){
		$content = $this->db->escape_str($content);
		$shortdesc = $this->db->escape_str($shortdesc);
		$que = "insert into promo_channel values(null, $idchannel, '$namapromo', curdate(), '$awalpromo', '$akhirpromo', '$pict', '$content', '$shortdesc')";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
	
	function deletePromo($idpromo, $idchannel){
		$que = "delete from promo_channel where id_promo=$idpromo and id_channel=$idchannel";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
	}
    
}
?>