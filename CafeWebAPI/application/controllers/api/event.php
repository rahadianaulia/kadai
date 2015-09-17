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

    function addEvent_post(){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $this->event->nama_event = $request->nama_event;
        $this->event->deskripsi = $request->deskripsi;
        $this->event->akhir_event = $request->akhir_event;
        $this->event->jumlah_point = $request->jumlah_point;

        $data = $this->event->addEvent();
        $hasil = array();
        if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
    }



    function editEvent_put(){
//        $postdata = file_get_contents("php://input");
//        $request = json_decode($postdata);
//        $data = $this->channel_model->editCity($request->idKota, $request->namaKota);
//        $hasil = array();
//        if($data>0){
//            $hasil[0]["status"] = 200;
//        }else{
//            $hasil[0]["status"] = 404;
//        }
//        $this->response($hasil);
        $this->event->nama_event ="karambia";
        $this->event->deskripsi = "deskripsi";
        $this->event->akhir_event = date('Ymd');
        $this->event->jumlah_point = 0;
        $this->response($this->event->editEvent());
    }
    function deleteEvent_delete(){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $this->event->id_event = $request->id_event;

//        $this->event->id_event = $this->delete("id_event");

        $data = $this->event->deleteEvent();
        $hasil = array();
        if($data>0){
            $hasil[0]["status"] = 200;
        }else{
            $hasil[0]["status"] = 404;
        }
        $this->response($hasil);
    }
}

?>