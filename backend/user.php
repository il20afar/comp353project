<?php
include('request.php');

/**
 * $this->fields = {
 *      'username', 'password',
 *      'firstname', 'lastname',
 *      'email', 'phoneno', 'address', 'city', 'province', 'country',
 *      'profilepicture',
 *      'ownedcondos?',
 *      'pictures?',
 *      'activity?',
 *      'friends?',
 *      'privacy?'
 * ]
 */
class user extends request
{
    public function __construct($conn)
    {
        parent::__construct(
            'user',
            [
                'username',
                'password',
                'firstname',
                'lastname',
                'email',
                'phoneno',
                'address',
                'city',
                'province',
                'country',
                'profilepicture',
            ],
            $conn
        );
    }

    public function login($obj)
    {

        $query = $this->select("firstname, lastname, email, phoneno, address, city, province, country, profilepicture", (array) $obj);
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