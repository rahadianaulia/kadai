<?php
class event_model extends CI_Model{
    // var $id_event;
    // var $id_channel;
    // var $nama_event;
    // var $deskripsi;
    // var $tgl_upload;
    // var $awal_event;
    // var $akhir_event;
    // var $jumlah_point;
    function __construct(){
        parent :: __construct();
        // $this->load->database();
        // $this->id_event=null;
        // $this->id_channel=1;
        // $this->tgl_upload = date('Ymd');
        // $this->awal_event = date('Ymd');
    }

    function getEvents(){
        // $query = $this->db->get("event");
        // return $query->result();
		$que = "select * from event where id_channel is null";
        $query = $this->db->query($que);
        return $query->result();
    }
	
	function getEventChannel($idchannel){
		$que = "select * from event where id_channel=$idchannel";
		$query = $this->db->query($que);
		return $query->result();
	}

    function addEvent($nama_event, $deskripsi, $akhir_event, $jumlah_point, $jumlah_coupon){
		$tgl_upload = date('Ymd');
        $que = "insert into event values (null, null, '$nama_event', '$deskripsi', '$tgl_upload', '$tgl_upload', '$akhir_event', $jumlah_point, $jumlah_coupon)";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
    }
	
	function addEventChannel($idchannel, $nama_event, $deskripsi, $akhir_event, $jumlah_point, $jumlah_coupon){
		$tgl_upload = date('Ymd');
        $que = "insert into event values (null, $idchannel, '$nama_event', '$deskripsi', '$tgl_upload', '$tgl_upload', '$akhir_event', $jumlah_point, $jumlah_coupon)";
		$query = $this->db->query($que);
		return $this->db->affected_rows();
    }

    function editEvent(){
        $this->db->where("id_event", $this->id_event);
        $this->db->update("event", $this);
        return $this->db->affected_rows();
    }

    function deleteEvent(){
        $this->db->where("id_event", $this->id_event);
        $this->db->delete("event");
        return $this->db->affected_rows();
//        return $this->id_event;
    }
}
?>