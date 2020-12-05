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
        $user_id = $obj['user_id'];
        $asso_id = $obj['asso_id'];
        $query = $this->select("*", array("asso_id" => $asso_id));
        $res = $this->query($query, true);
        foreach ($res['activities'] as $key => &$activity) {
            $creator_id = $activity['creator_id'];
            $activity_id = $activity['activity_id'];
            // Append the creator username
            $query = sprintf(
                'SELECT username FROM users WHERE user_id=%s;',
                $creator_id
            );
            $result = $this->gquery($query, true);
            $activity['creator_username'] = $result[0]['username'];
            // Append has_responded
            $query = sprintf(
                'SELECT * FROM attends WHERE user_id=%s AND activity_id=%s;',
                $user_id,
                $activity_id
            );
            $result = $this->gquery($query, true);
            if (is_string($result) and $result == "Empty set.") {
                $activity['has_responded'] = false;
            } else {
                $activity['has_responded'] = true;
            }
            unset($activity);
        }
        return json_encode($res);
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