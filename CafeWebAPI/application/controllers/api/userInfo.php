<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class UserInfo extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
		$this->load->helper('form');
        $this->load->model("user_model");
    }

    function userProfile_get()
    {
        $username = $this->get("username");

        $data = $this->user_model->getUserInfo($username);
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }

    }

    function listUser_get()
    {

        $data = $this->user_model->getUser();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }

    }

    function register_post()
    {
        // $username = $this->post('username');
        // $pass = $this->post("pass");
        // $fbacc = $this->post("fbacc");
        // $nama = $this->post("nama");
        // $jekel = $this->post("jekel");
        // $tgllahir = $this->post("tgllahir");
		
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$tanggal_lahir = $request->tanggallahir;
		
        // $data = $this->user_model->register($username ,$pass,$fbacc,$nama, $jekel,$tgllahir);
        $data = $this->user_model->register($request->username, $request->password, $request->email, $request->nama, $request->jeniskelamin, $tanggal_lahir);
		$this->response($data);
    }


    function login_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		
		$username = $request->username;
		$pass = $request->pass;
		
        // $username = $this->post("username");
        // $pass = $this->post("pass");
        $data = $this->user_model->login($username,$pass);
        $hasil = array();
        if($data[0]->status==200){
            $hasil[0]["status"] = 200;
            $hasil[0]["msg"]= $this->getToken();
        }else{
            $hasil = $data;
        }
        $this->response($hasil);
    }
	
	function edit_post(){				
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->user_model->editProfile($request->username, $request->nama, $request->jeniskelamin, $request->tanggallahir, $request->email);
		
		$hasil = array();
		if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 500;
        }
        $this->response($hasil);
	}
	
	function changepass_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->user_model->changePassword($request->username, $request->oldpassword, $request->newpassword);
		$this->response($data);
	}

    function getToken(){
        return base64_encode("admin:1234");
    }

    function uploadAvatar_post(){
        $path="../user/";
        if( !is_dir($path) ) {
            mkdir($path);
        }
        $config['upload_path']          = $path;
        $config['allowed_types']        = 'gif|jpg|png';
//        $config['max_size']             = 100;
//        $config['max_width']            = 1024;
//        $config['max_height']           = 768;


        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if(! $this->upload->do_upload('avatar')){
            $this->response(array('error' => strip_tags($this->upload->display_errors())), 404);
        } else {
            $upload = $this->upload->data();
            $this->response($upload, 200);
//            print_r($upload["file_name"]);
        }


    }


}

?>