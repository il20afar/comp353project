<?php
class session
{
    public function start($obj)
    {
        session_start();
        $_SESSION["is_logged_in"] = True;
        $_SESSION["user_id"] = ((array) $obj)['user_id'];
        return json_encode("Session succesfully started.");
    }
    
    public function destroy($obj)
    {
        session_start();
        session_destroy();
        return json_encode("Session succesfully destroyed.");
    }

    public function check($obj)
    {
        session_start();
        if (isset($_SESSION["is_logged_in"])) {
            return json_encode(True);
        } else {
            return json_encode(False);
        }
    }
}
?>