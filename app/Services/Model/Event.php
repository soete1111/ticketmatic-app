<?php

namespace App\Services\Model;

class Event implements \JsonSerializable
{
    public function __construct(array $data = array()) {
        foreach ($data as $key => $value) {
            $this->$key = $value;
        }
    }





    public $id;

    public $name;

    public $code;

    public $description;

    /**
     * Serialize Event to JSON.
     *
     * @return array
     */
    public function jsonSerialize() : array
    {
        $r = array();
        if (!is_null($this->id)) {
            $result["id"] = intval($this->id);
        }
        if (!is_null($this->name)) {
            $result["name"] = strval($this->name);
        }
        if (!is_null($this->code)) {
            $result["code"] = intval($this->code);
        }
        if (!is_null($this->description)) {
            $result["description"] = strval($this->description);
        }
        return $r;
    }

    public static function fromJson($obj) : ?Event
    {
        if($obj === null)
        {
            return null;
        }

        return new Event(array(
            "id" => isset($obj->id) ? $obj->id : null,
            "name" => isset($obj->id) ? $obj->id : null,
            "code" => isset($obj->id) ? $obj->id : null,
            "description" => isset($obj->id) ? $obj->id : null,
        ));
    }

}
