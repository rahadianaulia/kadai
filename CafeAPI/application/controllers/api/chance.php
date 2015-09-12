<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Chance extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("chance_model");
    }
	
	function listchance_get(){
		$data = $this->chance_model->listChance();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function detailchance_get(){
		$id = $this->get("idchance");
		$data = $this->chance_model->detailChance($id);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function checkactivity_get(){
		$username = $this->get("username");
		$idchance = $this->get("idchance");
		$data = $this->chance_model->checkActivity($username,$idchance);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function writelog_get(){
		$username = $this->get("username");
		$idchance = $this->get("idchance");
		$bonus = $this->get("bonus");
		$data = $this->chance_model->writeLog($username, $idchance, $bonus);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function expiredbonus_get(){
		$idlog = $this->get("idlog");
		$data = $this->chance_model->expiredBonus($idlog);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 500;
        }
        $this->response($hasil);
	}
}
?>