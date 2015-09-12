<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Promo extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("promo_model");
    }

    function viewall_get(){
		$data = $this->promo_model->getPromo();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function detailpromo_get(){
		$id = $this->get("idpromo");
		$data = $this->promo_model->getDetailPromo($id);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
}
?>