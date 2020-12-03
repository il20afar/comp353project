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
        echo $query;
        echo "<br>";
        $res = $this->query($query, false);
        echo $res;
        echo "<br>";
    }
}
?>