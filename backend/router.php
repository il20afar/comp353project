<?php
include 'users.php';
include 'ads.php';
include 'threads.php';
include 'replies.php';
include 'polls.php';
include 'messages.php';
include 'activities.php';
include 'associations.php';

class router
{
    // private object $users  = (object)[]; 
    // private object $ads  = (object)[];
    // private object $threads  = (object)[];
    // private object $replies  = (object)[];
    // private object $polls  = (object)[];
    // private object $messages  = (object)[];
    // private object $activities  = (object)[];
    // private object $associations  = (object)[];

    public function __construct(object $conn)
    {
        $this->users = new users($conn);
        $this->ads = new ads($conn);
        $this->threads = new threads($conn);
        $this->replies = new replies($conn);
        $this->polls = new polls($conn);
        $this->messages = new messages($conn);
        $this->activities = new activities($conn);
        $this->associations = new associations($conn);
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
