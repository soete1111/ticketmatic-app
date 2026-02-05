<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;


class TicketmaticClient
{
    public $baseUrl = 'https://test.ticketmatic.com/api/1/';

    public $accountName;

    public $apiKey;

    public $apiSecret;

    public function __construct(string $accountName, string $apiKey, string $apiSecret)
    {
        $this->accountName = $accountName;
        $this->apiKey = $apiKey;
        $this->apiSecret = $apiSecret;
    }

    /// might be better to split things up here: 
    ///create a client first with separate function to execute the request
    public function request(string $path, array $params = [])
    {
        $url = $this->baseUrl . $this->accountName;
        $r = Http::withBasicAuth($this->apiKey, $this->apiSecret)
            ->baseUrl($url)
            ->acceptJson()
            ->get($path);

        return $r;
    }

    public function getSalesPerPriceType(int $eventId): array
{
   
        return [
            [
                'price_type_id' => 1,
                'price_type_name' => 'Standard',
                'quantity' => 120,
                'gross' => 2400.00,
            ],
            [
                'price_type_id' => 2,
                'price_type_name' => 'Student',
                'quantity' => 60,
                'gross' => 900.00,
            ],
            [
                'price_type_id' => 3,
                'price_type_name' => 'VIP',
                'quantity' => 15,
                'gross' => 1500.00,
            ],
        ];
    }




}

