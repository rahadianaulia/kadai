<?php
class Kota_model extends CI_Model{
    function __construct(){
        parent::__construct();
    }

    function getAll(){
        $que = "select * from kota";
        $query = $this->db->query($que);
        return $query->result();
    }
}
?>