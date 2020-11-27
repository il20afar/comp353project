<?php
include_once 'request.php';
class threads extends request
{
    public function __construct($conn)
    {
        parent::__construct('threads', $conn);
    }

    public function create($obj)
    {
        $query = $this->insert("title, creation_time, last_update_time, creator_username, creator_id", (array) $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $query = $this->select("*", (array) $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }
}
?>