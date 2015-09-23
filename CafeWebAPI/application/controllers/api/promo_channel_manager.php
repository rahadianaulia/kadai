<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Promo_channel_manager extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("promo_channelmanager_model");
    }
	
	function listPromo_get(){
		$data = $this->promo_channelmanager_model->listPromo();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function getAllChannel_get(){
		$data = $this->promo_channelmanager_model->getAllChannel();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function promoByChannel_get(){
		$idchannel = $this->get("idchannel");
		$data = $this->promo_channelmanager_model->promoByChannel($idchannel);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
}
?>