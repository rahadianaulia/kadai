<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Point extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("point_model");
    }
	
	function viewpoint_get(){
		$username = $this->get("username");
		$data = $this->point_model->viewPoint($username);
		if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
	
	function changepoint_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->point_model->changePoint($request->username, $request->point, $request->idchannel);
		$this->response($data);
	}
	
	function addpoint_post(){
		$postdata = file_get_contents("php://input");
		$request = json_decode($postdata);
		$data = $this->point_model->addPoint($request->username, $request->coupon);
		$this->response($data);
	}

}
?>