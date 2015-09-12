<?php
class Channel_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
    function getChannelPromo(){
        $que = "select promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo,  promo_channel.nama_promo, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.pict, promo_channel.content, promo_channel.short_desc from promo_channel join channel on promo_channel.id_channel=channel.id_channel order by promo_channel.id_promo desc";
        $query = $this->db->query($que);
        return $query->result();
    }
	
	function getDetailChannelPromo($id){
		$que = "select promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo,  promo_channel.nama_promo, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.pict, promo_channel.content from promo_channel join channel on promo_channel.id_channel=channel.id_channel where promo_channel.id_promo=$id";
        $query = $this->db->query($que);
        return $query->result();
	}
	
	function getChannel(){
		$que = "select * from channel";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function getDetailChannel($id){
		$que = "select * from channel where id_channel=$id";
		$query = $this->db->query($que);
		return $query->result();
	}
	
	function getChannelPromoByCity($idkota){
		$que = "select promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo,  promo_channel.nama_promo, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.pict, promo_channel.content, promo_channel.short_desc from promo_channel join channel on promo_channel.id_channel=channel.id_channel where channel.id_kota=$idkota order by promo_channel.id_promo desc";
        $query = $this->db->query($que);
        return $query->result();
	}
	
	function getCity(){
		$que = "select * from kota order by nama_kota asc";
        $query = $this->db->query($que);
        return $query->result();
	}
}
?>