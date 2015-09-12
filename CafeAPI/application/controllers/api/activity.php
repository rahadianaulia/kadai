<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Activity extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("activity_model");
    }
	
	function viewactivity_get(){
		$username = $this->get("username");
		$data = $this->activity_model->viewActivity($username);
		$this->response($data);
	}
}
?>