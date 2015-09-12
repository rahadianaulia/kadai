<?php
class model_user extends CI_Model{

function __construct(){
	parent::__construct();
}

function get_user(){
	$this->load->database();
	$query=$this->db->get('user');
	echo $query->result();
}
}
?>