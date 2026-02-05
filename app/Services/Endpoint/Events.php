<?php

namespace App\Services\Endpoint;

use App\Services\Model\Event;
use App\Services\TicketmaticClient;

class Events
{
    public static function get(TicketmaticClient $client, $id)
    {
        return [
            'id' => 1,
            'name' => 'Sample Concert A',
            'startts' => '2026-03-15T20:00:00',
        ];
        //todo somehow something wrong when retrieving data
        //$r = $client->request("/events/$id");
        //return Event::fromJson($r);
    }
    
    public static function getEvents(TicketmaticClient $client)
    {
        //todo should prob return eventList or somethng
        $r = $client->request("/events");
        return $r["data"];
    } 
}