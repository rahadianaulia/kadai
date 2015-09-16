<?php
class event_model extends CI_Model{
    var $id_event;
    var $id_channel;
    var $nama_event;
    var $deskripsi;
    var $tgl_upload;
    var $awal_event;
    var $akhir_event;
    var $jumlah_point;
    function __construct(){
        parent :: __construct();
        $this->load->database();
        $this->id_event=null;
        $this->id_channel=1;
        $this->tgl_upload = date('Ymd');
        $this->awal_event = date('Ymd');
    }

    function getEvents(){
        $query = $this->db->get("event");
        return $query->result();
    }

    function addEvent(){
        $this->db->insert("event", $this);
        return $this->db->affected_rows();
    }
//    function addEvent(){
//        $que = "insert into event values(null, $this->id_channel, '$this->nama_event', '$this->deskripsi',
//                curdate(), curdate(), $this->akhir_event, $this->jumlah_point)";
//        $query = $this->db->query($que);
////        $this->db->insert("event", $this);
//        return $this->db->affected_rows();
//    }

    function editEvent(){
        $this->db->where("id_event", $this->id_event);
        $this->db->update("event", $this);
        return $this->db->affected_rows();
    }
}
?>