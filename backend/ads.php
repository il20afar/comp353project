<?php
include_once 'request.php';

class ads extends request
{
    public function __construct($conn)
    {
        parent::__construct('ads',$conn);
    }

    public function create($obj)
    {
        $query = $this->insert("title, ad_type, ad_desc, ad_price, ad_city, visibility, pictures, creator_id", (array) $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function remove($obj)
    {
        $query = $this->delete((array) $obj);
        $res = $this->query($query, false);
        return json_encode($res);
    }

    public function get($obj)
    {
        $query = $this->select("*", (array) $obj);
        $res = $this->query($query, true);
        return json_encode($res);
    }

    public function edit($obj)
    {
        $ad_id = ((array) $obj)['ad_id'];
        unset($obj['ad_id']);
        $where = sprintf(
            "ad_id=%s",
            $ad_id
        );
        $query = $this->update((array) $obj, $where);
        $res = $this->query($query, false);
        return json_encode($res);
    }
}
?>