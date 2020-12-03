<?php
include_once 'request.php';
class messages extends request
{
    public function __construct($conn)
    {
        parent::__construct('messages', $conn);
    }

    public function create($obj)
    {
        if (array_key_exists('attachments', $obj)) {
            $columns = "message_subject, content, attachments, author_id, recipient_id";
        } else {
            $columns = "message_subject, content, author_id, recipient_id";
        }
        $query = $this->insert($columns, $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $user_id = $obj['user_id'];

        $query = $this->select("*", ["recipient_id" => $user_id]);
        $res = $this->query($query, true);
        return json_encode($res);
    }
}
?>