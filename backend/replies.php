<?php
include_once 'request.php';
class replies extends request
{
    public function __construct($conn)
    {
        parent::__construct('replies', $conn);
    }

    public function create($obj)
    {
        $query = $this->insert("content, creation_time, author_id, thread_id", (array) $obj);
        // Byproduct of adding a reply to a thread:
        // (1) number_of_replies incremented
        // (2) last_update_time updated
        $thread_id = ((array) $obj)['thread_id'];
        $creation_time = ((array) $obj)['creation_time'];
        $update_query = sprintf(
            "UPDATE threads SET last_update_time='%s', number_of_replies = number_of_replies + 1 WHERE thread_id=%s;",
            $creation_time,
            $thread_id
        );
        $res = $this->query($query, false);
        $update_res = $this->query($update_query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $query = $this->select("*", (array) $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }
}
?>