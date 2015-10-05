<?php
class Event_channelmanager_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }
	
	function listEvent(){
		$que = "SELECT event.id_event, channel.nama_channel, channel.logo, event.nama_event, event.deskripsi, event.tgl_upload, event.awal_event, event.akhir_event, event.jumlah_point, event.jumlah_coupon FROM EVENT JOIN channel ON event.id_channel=channel.id_channel";
		$query = $this->db->query($que);
		return $query->result();
	}
	
}
?>