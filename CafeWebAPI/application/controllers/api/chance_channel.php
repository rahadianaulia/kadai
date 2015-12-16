<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Chance_channel extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("chance_channel_model");
    }
	
	function listChance_get(){
		$idchannel = $this->get("idchannel");
		$data = $this->chance_channel_model->listChance($idchannel);
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function uploadPictChance_post(){
        $path="../chance/";
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
	
	function saveChance_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->chance_channel_model->saveChance($request->idchannel, $request->title, $request->startdate, $request->enddate, $request->bonus, $request->totalbonus, $request->picture, $request->deskripsi);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function editChance_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->chance_channel_model->editChance($request->idchannel, $request->idchance, $request->title, $request->startdate, $request->enddate, $request->bonus, $request->totalbonus, $request->picture, $request->deskripsi);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function chanceById_get(){
		$idchance = $this->get("idchance");
		$data = $this->chance_channel_model->chanceById($idchance);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function deleteChance_get(){
		$idchance = $this->get("idchance");
		$idchannel = $this->get("idchannel");
		$data = $this->chance_channel_model->deleteChance($idchance, $idchannel);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function detailLogChance_get(){
		$idchance = $this->get("idchance");
		$data = $this->chance_channel_model->detailLogChance($idchance);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
}
?>