<?php

class Channel_model extends CI_Model
{
    var $id;
    var $namaChannel;
    var $idKota;
    var $deskripsi;
    var $user;
    var $password;
    var $alamat;
    var $hp;
    var $email;
    var $logo;

    function __construct()
    {
        parent::__construct();
    }

    function getChannelPromo()
    {
        $que = "select promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo,
promo_channel.nama_promo, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo,
promo_channel.pict, promo_channel.content from promo_channel join channel on promo_channel.id_channel=channel.id_channel order by promo_channel.id_promo desc";
        $query = $this->db->query($que);
        return $query->result();
    }

    function getDetailChannelPromo($id)
    {
        $que = "select promo_channel.id_promo, promo_channel.id_channel, channel.nama_channel, channel.logo,  promo_channel.nama_promo, promo_channel.tgl_upload, promo_channel.awal_promo, promo_channel.akhir_promo, promo_channel.pict, promo_channel.content from promo_channel join channel on promo_channel.id_channel=channel.id_channel where promo_channel.id_promo=$id";
        $query = $this->db->query($que);
        return $query->result();
    }

    function getChanel()
    {
        $que = "select * from channel left join kota using (id_kota)";
        $query = $this->db->query($que);
        return $query->result();
    }

    function getChanelById()
    {
        $que = "select * from channel left join kota using (id_kota) where id_channel = '$this->id'";
        $query = $this->db->query($que);
        return $query->result();
    }

    function addCity($namaKota)
    {
        $que = "insert into kota values(null, '$namaKota')";
        $query = $this->db->query($que);
        return $this->db->affected_rows();
    }

    function editCity($idKota, $namaKota)
    {
        $que = "update kota set nama_kota='$namaKota' where id_kota=$idKota";
        $query = $this->db->query($que);
        return $this->db->affected_rows();
    }

    function deletecity($idKota)
    {
        $que = "delete from kota where id_kota=$idKota";
        $query = $this->db->query($que);
        return $this->db->affected_rows();
    }
}

?>