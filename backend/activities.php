<?php
include_once 'request.php';
class activities extends request
{
    public function __construct($conn)
    {
        parent::__construct('activities', $conn);
    }

    public function create($obj)
    {
        $query = $this->insert("title, activity_desc, starting_time, ending_time, creator_id, asso_id", $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }
}
?>