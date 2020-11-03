<?php
include 'db_config.php';

class request
{
    private string $type;
    private object $fields;
    private object $conn;

    public function __construct(string $type, array $fields, object $conn)
    {
        $this->type = $type;
        $this->fields = (object) $fields;
        $this->conn = $conn;
    }

    public function query(string $query, bool $returnRows)
    {
        if (!$this->conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $res = mysqli_query($this->conn, $query);
        $rows = array();
        if($returnRows){
            while($r = mysqli_fetch_assoc($res)) {
                $rows['user'][] = $r;
            }
            return $rows;

        }

        else return mysqli_affected_rows($this->conn);
    }

    public function select(string $from, array $fields)
    {
        foreach ($fields as $key => $val) {
            $where[] = "$key='$val'";
        }
        return sprintf(
            "SELECT %s FROM %s WHERE %s;",
            $from,
            $this->type,
            implode(" AND ", $where)
        );
    }

    public function update(array $fields, string $where)
    {
        $set = array();
        foreach ($fields as $key => $val) {
            $set[] = "$key='$val'";
        }
        return sprintf(
            "UPDATE %s SET %s WHERE %s;",
            $this->type,
            implode(', ', $set),
            $where
        );
    }

}
?>
