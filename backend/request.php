<?php
include 'db_config.php';

class request
{
    private string $table;
    private object $conn;

    public function __construct(string $table, object $conn)
    {
        $this->table = $table;
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
                $rows[$this->table][] = $r;
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
            $this->table,
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
            $this->table,
            implode(', ', $set),
            $where
        );
    }

}
?>
