<?php
include_once 'request.php';
class users extends request
{
    public function __construct($conn)
    {
        parent::__construct('users', $conn);
    }

    public function login($obj)
    {

        $query = $this->select("user_id, first_name, last_name, street, city, province, country, email, phone_number, profile_picture, asso_id", (array) $obj);
        $res = $this->query($query, true);
        // Append is_admin
        $asso_id = $res['users'][0]['asso_id'];
        $user_id = $res['users'][0]['user_id'];
        $query = sprintf(
            "SELECT admin_id FROM associations WHERE asso_id=%s;",
            $asso_id
        );
        $result = $this->gquery($query, true);
        if ($user_id == $result[0]['admin_id']) {
            $res['users'][0]['is_admin'] = true;
        } else {
            $res['users'][0]['is_admin'] = false;
        }
        return json_encode($res);
    }
    
    public function modify($obj)
    {
        $username = ((array) $obj)['username'];
        $where = sprintf(
            "username='%s'",
            $username
        );
        $query = $this->update((array) $obj, $where);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $query = $this->select("*", $obj);
        $res = $this->query($query, true);
        // Append the is_admin field
        foreach ($res['users'] as $key => &$user) {
            $user_id = $user['user_id'];
            $asso_id = $user['asso_id'];
            if (is_null($asso_id)) {
                $user['is_admin'] = false;
            } else {
                $query = sprintf(
                    "SELECT admin_id FROM associations WHERE asso_id=%s;",
                    $asso_id
                );
                $result = $this->gquery($query, true);
                if ($user_id == $result[0]['admin_id']) {
                    $user['is_admin'] = true;
                } else {
                    $user['is_admin'] = false;
                }
            }
            unset($user);
        }
        return json_encode($res);
    }
}
?>