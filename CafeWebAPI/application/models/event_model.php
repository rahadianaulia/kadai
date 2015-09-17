<?php
class event_model extends CI_Model{
    function __construct(){
        parent :: __construct();
        $this->load->database();
    }

    function getEvents(){
        $que = "select * from event";
        $query = $this->db->query($que);
        return $query->result();
    }
}
?>