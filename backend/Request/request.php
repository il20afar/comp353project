<?php
include '../db_config.php';

class req {
    private string $type;
    private object $fields;
    private string $query;
    private string $result;
  
    public function __construct($type, $fields, $query){
        $this->type = $type;
        $this->fields = json_decode(json_encode($fields), FALSE);
        $this->query = $query;
    }

    public function getParams (){
        $json = file_get_contents('php://input');
        $obj = json_decode($json, true);
        foreach($this->fields as $key) {
            $this->fields = $obj[$key];
          }
    }

    public function queryDb(){
        $conn = mysqli_connect(
            $hostname, 
            $db_username, 
            $db_password, 
            $database_name
        );

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        $this->result = mysqli_query($conn, $this->query);
    }

    public function respond(){
        echo json_encode(mysqli_num_rows($result) > 0 ? "Property found": "Wrong request");
    }

    public function lifecycle(){
        getParams();
        queryDb();
        respond();
    }
}

class login extends req {
    public function __construct($fields, $action, $response){
        $this->type= 'login';
        parent::__construct(["name", "password"], function(){}, $response);
    }

    
}
?>