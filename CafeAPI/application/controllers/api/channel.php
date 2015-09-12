<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Channel extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("channel_model");
    }

    function channelpromo_get()
    {
        $data = $this->channel_model->getChannelPromo();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
    }
	
	function detailpromo_get(){
		$id = $this->get("idpromo");
		$data = $this->channel_model->getDetailChannelPromo($id);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function infochannel_get(){
		$data = $this->channel_model->getChannel();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function detailchannel_get(){
		$id = $this->get("id");
		$data = $this->channel_model->getDetailChannel($id);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function channelpromobycity_get(){
		$idkota = $this->get("idkota");
		$data = $this->channel_model->getChannelPromoByCity($idkota);
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function kota_get(){
		$data = $this->channel_model->getCity();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
}
?>