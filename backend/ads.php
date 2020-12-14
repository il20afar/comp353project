<?php
include_once 'request.php';
class ads extends request
{
    public function __construct($conn)
    {
        parent::__construct('ads', $conn);
    }

    public function create($obj)
    {
        if (empty($obj['pictures'])) {
            $obj['pictures'] = 'http://localhost:3001/backend/pictures/ads/default-ad-picture.png';
            $columns = "title, ad_type, ad_desc, ad_price, ad_city, visibility, pictures, creator_id";
            $query = $this->insert($columns, $obj);
            $res = $this->query($query, false);
            return json_encode($res);
        } else {
            $columns = "title, ad_type, ad_desc, ad_price, ad_city, visibility, pictures, creator_id";
            // Iterate over each picture
            $pictures_column = "";
            foreach ($obj['pictures'] as $key => $picture) {
                $base64_string = $picture;
                $image_parts = explode(";base64,", $base64_string);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $file = 'pictures/ads/' . uniqid() . "." . $image_type;
                // Save picture to local storage
                file_put_contents($file, $image_base64);
                if (($key + 1) == count($obj['pictures'])) {
                    $pictures_column .= 'https://hac353.encs.concordia.ca/comp353project/backend/' . $file;
                } else {
                    $pictures_column .= 'https://hac353.encs.concordia.ca/comp353project/backend/' . $file . ', ';
                }
            }
            // Insert ad data to database
            $obj['pictures'] = $pictures_column;
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