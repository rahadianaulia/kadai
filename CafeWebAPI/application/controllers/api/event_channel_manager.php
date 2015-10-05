<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class Event_channel_manager extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("event_channelmanager_model");
    }
	
	function listEvent_get(){
		$data = $this->event_channelmanager_model->listEvent();
        if($data){
            $this->response($data,200);
        }else{
            $this->response(null,404);
        }
	}
		
}
?>