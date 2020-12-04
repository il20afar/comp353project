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

    public function get($obj)
    {
        $asso_id = $obj['asso_id'];
    }

    public function attend($obj)
    {
        $user_id = $obj['user_id'];
        $activity_id = $obj['activity_id'];
        // Add (user_id, activity_id) pair to attends table
        $query = sprintf(
            'INSERT INTO attends (user_id, activity_id) VALUES (%s, %s);',
            $user_id,
            $activity_id
        );
        $res = $this->query($query, false);
        if ($res != 1) {
            return json_encode(-1);
        }
        // Increment number_of_attendees of given activity
        $query = sprintf(
            'UPDATE activities SET number_of_attendees = number_of_attendees + 1 WHERE activity_id=%s;',
            $activity_id
        );
        $res = $this->query($query, false);
        return json_encode($res);
    }
}
?>