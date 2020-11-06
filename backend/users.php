<?php
include('request.php');

class users extends request
{
    public function __construct($conn)
    {
        parent::__construct(
            'users',
            $conn
        );
    }

    public function login($obj)
    {

        $query = $this->select("first_name, last_name, street, city, province, country, email, phone_number, profile_picture", (array) $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }

    
    public function modify($obj){
        $username = ((array) $obj)['username'];
        $where = sprintf(
            "username='%s'",
            $username
        );
        $query = $this->update((array) $obj, $where);
        $res = $this->query($query, false);
        return json_encode($res);
    }
}
?>