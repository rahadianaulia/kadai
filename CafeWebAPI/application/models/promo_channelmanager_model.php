<?php
class Promo_channelmanager_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function listPromo(){
		$que = "SELECT promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo, promo_channel.nama_promo, promo_channel.pict, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.short_desc, promo_channel.content FROM promo_channel JOIN channel ON promo_channel.id_channel=channel.id_channel order by promo_channel.id_promo desc";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function getAllChannel(){
		$que = "select id_channel, nama_channel from channel";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function promoByChannel($idchannel){
		$que = "SELECT promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo, promo_channel.nama_promo, promo_channel.pict, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.short_desc, promo_channel.content FROM promo_channel JOIN channel ON promo_channel.id_channel=channel.id_channel WHERE promo_channel.id_channel=$idchannel";
		$query = $this->db->query($que);
		return $query->result();
	}
}
?>