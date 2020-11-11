<?php
include 'users.php';

class router
{
    private object $users;

    public function __construct(object $conn)
    {
        $this->users= new users($conn);
    }

    public function route()
    {
        // Set the headers
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Content-Type');

        // Retrieve destructured parameters
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        $table = $obj['table'];
        $action = $obj['action'];
        unset($obj['table']);
        unset($obj['action']);

        // Route to the appropriate type and action
        echo $this->$table->$action($obj);
    }
}
?>
