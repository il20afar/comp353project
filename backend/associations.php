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
        $asso_name = $obj['asso_name'];
        $query = $this->insert("asso_name, asso_desc, admin_id", $obj);
        $res = $this->query($query, false);
        if ($res != 1) {
            return json_encode($res);
        }
        $query = sprintf(
            "SELECT asso_id FROM associations WHERE asso_name='%s';",
            $asso_name
        );
        $res = $this->gquery($query, true);
        $asso_id = $res[0]['asso_id'];
        if (is_string($res) and $res == "Empty set.") {
            return json_encode($res);
        } else {
            return json_encode($asso_id, JSON_NUMERIC_CHECK);
        }
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
        // Get the admin_id
        $query = sprintf(
            "SELECT admin_id FROM associations WHERE asso_id=%s;",
            $asso_id
        );
        $res = $this->query($query, true);
        $admin_id = $res['associations'][0]['admin_id'];
        // Get the admin username
        $query = sprintf(
            "SELECT username FROM users WHERE user_id=%s;",
            $admin_id
        );
        $res = $this->gquery($query, true);
        $admin_username = $res[0]['username'];
        return json_encode(["admin_id" => $admin_id, "admin_username" => $admin_username], JSON_NUMERIC_CHECK);
    }
}
?>