<?php
include_once 'request.php';
class polls extends request
{
    public function __construct($conn)
    {
        parent::__construct('polls', $conn);
    }

    public function create($obj)
    {
        $question = $obj['question'];
        $asso_id = $obj['asso_id'];
        $answers = $obj['answers'];
        // Create the poll
        $query = $this->insert("question, asso_id", [$question, $asso_id]);
        $res = $this->query($query, false);
        if ($res == -1) {
            return json_encode($res);
        }
        // Get the id of the poll we just created
        $query = sprintf(
            "SELECT poll_id FROM polls WHERE question='%s';",
            $question
        );
        $res = $this->query($query, true);
        $poll_id = $res['polls'][0]['poll_id'];
        // Create the answers
        $successful_queries = 0;
        foreach ($answers as $answer) {
            $query = sprintf(
                "INSERT INTO answers (content, poll_id) VALUES ('%s', %s);",
                $answer,
                $poll_id
            );
            $res = $this->query($query, false);
            if ($res == 1) {
                $successful_queries++;
            }
        }
        if ($successful_queries == count($answers)) {
            return json_encode(1);
        }
    }
}
?>