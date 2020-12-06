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
        if (empty($obj['pictures'])) {
            unset($obj['pictures']);
            $columns = "title, ad_type, ad_desc, ad_price, ad_city, visibility, creator_id";
            $query = $this->insert($columns, $obj);
            $res = $this->query($query, false);
            return json_encode($res);
        } else {
            $columns = "title, ad_type, ad_desc, ad_price, ad_city, visibility, pictures, creator_id";
            $base64_string = $obj['pictures'][0];
            $image_parts = explode(";base64,", $base64_string);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = 'ads/' . uniqid() . "." . $image_type;
            // Save picture to local storage
            if (!is_dir('ads/')) {
                mkdir('ads/');
              }
            file_put_contents($file, $image_base64);
            $obj['pictures'] = 'http://localhost:3001/backend/' . $file;
            // Insert ad data to database
            $query = $this->insert($columns, $obj);
            $res = $this->query($query, false);
            return json_encode($res);
        }
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