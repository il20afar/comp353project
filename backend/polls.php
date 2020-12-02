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

    public function get($obj)
    {
        $user_id = $obj['user_id'];
        $asso_id = $obj['asso_id'];
        // Get all polls for specific association
        $query = $this->select("poll_id, question, number_of_votes, poll_status", array("asso_id" => $asso_id));
        $res = $this->query($query, true);
        // Append to every poll the corresponding answers
        foreach ($res['polls'] as $key => &$poll) {
            $poll_id = $poll['poll_id'];
            $poll_votes = $poll['number_of_votes'];
            $get_answers_query = sprintf(
                "SELECT answer_id, content, number_of_votes FROM answers WHERE poll_id=%s;",
                $poll_id
            );
            $answers = $this->gquery($get_answers_query, true);
            foreach ($answers as $key => $answer) {
                $answer_votes = $answers[$key]['number_of_votes'];
                if ($poll_votes != 0) {
                    $answers[$key]['percentage'] = round($answer_votes/$poll_votes*100);
                } else {
                    $answers[$key]['percentage'] = 0;
                }
            }
            $poll['answers'] = $answers;
            $has_voted_query = sprintf(
                "SELECT * FROM voted_in WHERE user_id=%s AND poll_id=%s;",
                $user_id,
                $poll_id
            );
            $has_voted = $this->gquery($has_voted_query, true);
            if (is_string($has_voted) and $has_voted == "Empty set.") {
                $poll['has_voted_in'] = false;
            } else {
                $poll['has_voted_in'] = true;
            }
            unset($poll);
        }
        return json_encode($res);
    }
}
?>