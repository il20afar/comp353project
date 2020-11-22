<?php
include('request.php');

class ads extends request
{
    public function __construct($conn)
    {
        parent::__construct('ads',$conn);
    }

    public function create($obj)
    {
        $query = $this->insert((array) $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function remove($obj)
    {
        $query = $this->delete((array) $obj);
        $res = $this->query($query, false);
        return json_encode($res)
    }

    public function get($obj)
    {
        $query = $this->select("*", (array) $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }
}
?>