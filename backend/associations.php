<?php
include_once 'request.php';
class associations extends request
{
    public function __construct($conn)
    {
        parent::__construct('associations', $conn);
    }

    public function create($obj)
    {
        $query = $this->insert("asso_name, asso_desc, admin_id", $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function admin($obj)
    {
        $new_admin_id = $obj['user_id'];
        $asso_id = $obj['asso_id'];
        $query = sprintf(
            "UPDATE associations SET admin_id=%s WHERE asso_id=%s;",
            $new_admin_id,
            $asso_id
        );
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $query = $this->select("*", $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }

    public function add($obj)
    {
        $user_id = $obj['user_id'];
        $asso_id = $obj['asso_id'];
        $query = sprintf(
            "UPDATE users SET asso_id=%s WHERE user_id=%s;",
            $asso_id,
            $user_id
        );
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function remove($obj)
    {
        $user_id = $obj['user_id'];
        $query = sprintf(
            "UPDATE users SET asso_id=NULL WHERE user_id=%s;",
            $user_id
        );
        $res = $this->query($query, false);
        return json_encode($res);
    }
    
    public function get_admin($obj)
    {
        $asso_id = $obj['asso_id'];
        $query = sprintf(
            "SELECT admin_id FROM associations WHERE asso_id=%s;",
            $asso_id
        );
        $res = $this->query($query, true);
        return json_encode($res['associations'][0]['admin_id'], JSON_NUMERIC_CHECK);
    }
}
?>