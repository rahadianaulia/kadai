<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Promo_channel extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("promo_channel_model");
    }
	
	function listPromo_get(){
		$idchannel = $this->get("idchannel");
		$data = $this->promo_channel_model->listPromo($idchannel);
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function editPromo_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->promo_channel_model->editPromo($request->idpromo, $request->namapromo, $request->awalpromo, $request->akhirpromo, $request->pict, $request->content, $request->shortdesc);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function getPromoById_get(){
		$idpromo = $this->get("idpromo");
		$idchannel = $this->get("idchannel");
		$data = $this->promo_channel_model->getPromoById($idpromo, $idchannel);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function addPromo_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->promo_channel_model->addPromo($request->idchannel, $request->namapromo, $request->awalpromo, $request->akhirpromo, $request->pict, $request->content, $request->shortdesc);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function deletePromo_get(){
		$idpromo = $this->get("idpromo");
		$idchannel = $this->get("idchannel");
		$data = $this->promo_channel_model->deletePromo($idpromo, $idchannel);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function uploadPictPromo_post(){
        $path="../promo_channel/";
        if( !is_dir($path) ) {
            mkdir($path);
        }
        $config['upload_path']          = $path;
        $config['allowed_types']        = 'gif|jpg|png|bmp';
//        $config['max_size']             = 100;
//        $config['max_width']            = 1024;
//        $config['max_height']           = 768;


        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if(! $this->upload->do_upload("picture")){
            $this->response(array('error' => strip_tags($this->upload->display_errors())), 404);
        } else {
            $upload = $this->upload->data();
            $this->response($upload, 200);
        }
    }
}
?>