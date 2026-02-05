<?php

namespace App\Http\Controllers;

use App\Services\BorderelCalculator;
use App\Services\Endpoint\Events;
use App\Services\Model\Event;
use App\Services\TicketmaticClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events = [];

        try {
            $c = new TicketmaticClient(config('ticketmatic.account'), config('ticketmatic.key'), config('ticketmatic.secret'));
            $events = Events::getEvents($c);
        } catch (\Throwable $e) {
        }


        return Inertia::render('welcome', [
            'events' => $events,
        ]);
    }

    public function show(string $eventId): Response
    {
        //$event = null;

        try {
            $c = new TicketmaticClient(config('ticketmatic.account'), config('ticketmatic.key'), config('ticketmatic.secret'));
            $event = Events::get($c,$eventId);
        } catch (\Throwable $e) {
            // logger()->error('Failed to load event from Ticketmatic', ['exception' => $e, 'eventId' => $eventId]);
        }

        return Inertia::render('Event/Show', [
            'event' => $event,
        ]);
    }


  public function borderel(int $eventId): JsonResponse
    {
        try {
            $c = new TicketmaticClient(config('ticketmatic.account'), config('ticketmatic.key'), config('ticketmatic.secret'));
            $sales =$c->getSalesPerPriceType($eventId);
            $calc = new BorderelCalculator();
            $borderel = $calc->calculate($sales);

            return response()->json([
                'borderel' => $borderel,
            ]);
        } catch (\Throwable $e) {
            // logger()->error('Failed to generate borderel', ['exception' => $e, 'eventId' => $eventId]);

            return response()->json([
                'message' => 'Could not generate borderel for this event.',
            ], 500);
        }
    }
}

