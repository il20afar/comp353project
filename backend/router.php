<?php
include 'user.php';

class router
{
    private object $user;
    // private object $marketing;
    // private object $social;
    // private object $info;

    public function __construct(object $conn)
    {
        $this->user = new user($conn);
    }

    public function route()
    {
        // Set the headers
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Content-Type");

        // Retrieve destructured parameters
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        $type = $obj['type'];
        $action = $obj['action'];
        unset($obj['type']);
        unset($obj['action']);

        // Route to the appropriate type and action
        echo $this->$type->$action($obj);
    }
}
?>
