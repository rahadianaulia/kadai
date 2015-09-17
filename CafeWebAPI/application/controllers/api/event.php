<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';
class event extends REST_Controller{
    function __construct(){
        parent::__construct();
        $this->load->model("event_model", "event");
    }
    function getEvents_get(){
        $data = $this->event->getEvents();
        $this->response($data, 200);
    }
}
?>