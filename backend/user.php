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
        $res = $this->query(
            $this->select((array) $obj)
        );
        return json_encode($res ? "Account found!" : "Wrong credentials");
    }

    public function create($obj){
        $res = $this->query(
            $this->insert((array) $obj)
        );
    }
}
?>