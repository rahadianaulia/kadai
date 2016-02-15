<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Dashboard extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("dashboard_model");
    }
	
	function totalUser_get(){
		$data = $this->dashboard_model->totalUser();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function totalChannel_get(){
		$data = $this->dashboard_model->totalChannel();
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
}
?>