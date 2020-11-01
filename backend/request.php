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

    public function query(string $query)
    {
        if (!$this->conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $res = mysqli_query($this->conn, $query);
        return mysqli_num_rows($res) > 0 ? $res : [];
    }

    public function select(array $fields)
    {
        foreach ($fields as $key => $val) {
            $from[] = $key;
            $where[] = "$key='$val'";
        }
        return sprintf(
            "SELECT %s FROM %s WHERE %s;",
            implode(', ', $from),
            $this->type,
            implode(" AND ", $where)
        );
    }

    public function insert(array $fields)
    {
        foreach ($fields as $key => $val) {
            $keys[] = $key;
            $values[] = $val;
        }
        return sprintf(
            "INSERT INTO %s (%s) VALUES (%s);",
            $this->type,
            implode(', ', $keys),
            implode(" AND ", $values)
        );
    }

}
?>
