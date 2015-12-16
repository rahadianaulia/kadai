<?php

class webuser_model extends CI_Model
{
    var $id;
    var $login;
    var $password;
    var $username;
    var $email;
    var $level;

    function __construct()
    {
        parent::__construct();
    }

    function userlogin()
    {
        $this->db->select("id, login, username, email, level, id_channel");
        $this->db->where("login", $this->login);
        $this->db->where("password", $this->password);
        $data = $this->db->get("webuser");
        return $data->result();
    }
}

?>