<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
require APPPATH . '/libraries/REST_Controller.php';

class webuser extends REST_Controller
{
    var $arrdata = array("id", "login", "username", "email", "level");

    function __construct()
    {
        parent::__construct();
        $this->load->model("webuser_model", "webuser");
    }

    function login_post()
    {

//        $this->webuser->login = $this->post('login');
//        $this->webuser->password = $this->post("password");
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $this->webuser->login = $request->username;
        $this->webuser->password = $request->password;
        $data = $this->webuser->userlogin();
        if (count($data) != 0) {
            $sesInfo = array(
                "id" => $data[0]->id,
                "login" => $data[0]->login,
                "username" => $data[0]->username,
                "email" => $data[0]->email,
                "level" => $data[0]->level,
            );
            $this->session->set_userdata($sesInfo);
            $this->response($data, 200);
        } else {
            $error = ["status" => false, "error" => "Not Authenticate"];
            $this->response($error, 401);
        }
    }


    function sessionvalue_get()
    {

        $sesData["id"] = $this->session->userdata("id");
        $sesData["login"] = $this->session->userdata("login");
        $sesData["username"] = $this->session->userdata("username");
        $sesData["email"] = $this->session->userdata("email");
        $sesData["level"] = $this->session->userdata("level");

        $this->response($sesData, 200);

    }

    function logout_get()
    {
        $this->session->sess_destroy();
        $response["status"] = true;
        $this->response($response, 200);
    }
}

?>