<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';
class Test extends REST_Controller{

    function view_get(){
        $data['nama'] = "Basic " . base64_encode("admin:1234");
        $this->response($data);
    }

    function view2_get(){
        $data['nama'] = "karambiacukia";
        $this->response($data);
    }
}
?>