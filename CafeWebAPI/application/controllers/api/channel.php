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

    function getChannel_get(){
        $data = $this->channel_model->getChanel();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
    }
	
	function getChannelById_get(){
        $this->channel_model->id = $this->get("idchannel");
        $data = $this->channel_model->getChanelById();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
    }
    function updateChannel_put()
    {
        $params = file_get_contents("php://input");
        $request = json_decode($params);
        $this->channel_model->id = $request->id_channel;
        $this->channel_model->namaChannel = $request->nama_channel;
        $this->channel_model->idKota = $request->id_kota;
        $this->channel_model->deskripsi = $request->deskripsi;
        $this->channel_model->user = $request->user;
        $this->channel_model->password = $request->password;
        $this->channel_model->alamat = $request->alamat;
        $this->channel_model->hp = $request->hp;
        $this->channel_model->email = $request->email;
        $this->channel_model->logo = $request-> logo;

        $hasil['status'] = $this->channel_model->updateChannel();

        if($hasil['status']){
            $this->response($hasil,200);
        }else{
            $this->response(false, 500);
        }

    }
    function getKota_get(){
        $this->load->model("Kota_model");
        $data = $this->Kota_model->getAll();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
    }
	
	function addcity_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->channel_model->addCity($request->namakota);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function editcity_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->channel_model->editCity($request->idKota, $request->namaKota);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function deletecity_get(){
		$idKota = $this->get("idkota");
		$data = $this->channel_model->deleteCity($idKota);
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
	}
	
	function uploadLogo_post(){
        $path="../logo_channel/";
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

        if(! $this->upload->do_upload("logochannel")){
            $this->response(array('error' => strip_tags($this->upload->display_errors())), 404);
        } else {
            $upload = $this->upload->data();
            $this->response($upload, 200);
        }


    }
}
?>