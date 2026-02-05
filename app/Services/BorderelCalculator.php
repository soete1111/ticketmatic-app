<?php

namespace App\Services;

class BorderelCalculator
{
    /**
     * Simulated costs per price type (id => cost per ticket).
     *
     * In the real assessment you can tweak these values or load them from
     * configuration, but for now we keep them hard-coded and simple.
     */
    private array $costsPerPriceType = [
        // price_type_id => cost per ticket
        1 => 2.50,
        2 => 1.00,
        3 => 5.00,
    ];

    /**
     * Calculate gross, costs and net revenue per price type and in total.
     *
     * @param  array<int, array{price_type_id:int|null,price_type_name:string,quantity:int,gross:float}>  $sales
     */
    public function calculate(array $sales): array
    {
        $perPriceType = [];

        $totalGross = 0.0;
        $totalCosts = 0.0;

        foreach ($sales as $row) {
            $priceTypeId = $row['price_type_id'];
            $priceTypeName = $row['price_type_name'];
            $quantity = $row['quantity'];
            $gross = $row['gross'];

            $costPerTicket = $this->costsPerPriceType[$priceTypeId] ?? 0.0;
            $costs = $costPerTicket * $quantity;
            $net = $gross - $costs;

            $perPriceType[] = [
                'price_type_id' => $priceTypeId,
                'price_type_name' => $priceTypeName,
                'quantity' => $quantity,
                'gross' => $gross,
                'costs' => $costs,
                'net' => $net,
            ];

            $totalGross += $gross;
            $totalCosts += $costs;
        }

        return [
            'per_price_type' => $perPriceType,
            'totals' => [
                'gross' => $totalGross,
                'costs' => $totalCosts,
                'net' => $totalGross - $totalCosts,
            ],
        ];
    }
}

