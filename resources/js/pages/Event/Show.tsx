import { Head } from '@inertiajs/react';
import { useState } from 'react';

type EventProps = {
    event: {
        id: number;
        name: string;
        startts?: string | null;
        [key: string]: unknown;
    } | null;
};

type BorderelRow = {
    price_type_id: number | null;
    price_type_name: string;
    quantity: number;
    gross: number;
    costs: number;
    net: number;
};

type Borderel = {
    per_price_type: BorderelRow[];
    totals: {
        gross: number;
        costs: number;
        net: number;
    };
};

export default function EventShow({ event }: EventProps) {
    const [borderel, setBorderel] = useState<Borderel | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!event) {
        return (
            <div className="min-h-screen bg-[#FDFDFC] px-6 py-8 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="mx-auto max-w-3xl">
                    <p className="text-sm text-red-600 dark:text-red-400">Event could not be loaded.</p>
                </div>
            </div>
        );
    }

    const handleGenerateBorderel = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/events/${event.id}/borderel`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate borderel');
            }

            const data = (await response.json()) as { borderel: Borderel };
            setBorderel(data.borderel);
        } catch (e) {
            console.log(e);
            const message = e instanceof Error ? e.message : 'Something went wrong';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (value: number) => value.toFixed(2);

    return (
        <>
            <Head title={event.name ?? 'Event details'} />
            <div className="min-h-screen bg-[#FDFDFC] px-6 py-8 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="mx-auto max-w-3xl space-y-8">
                    <header>
                        <h1 className="text-2xl font-semibold">{event.name}</h1>
                        {event.startts && (
                            <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">Starts at: {event.startts}</p>
                        )}
                    </header>

                    <section className="space-y-3">
                        <button
                            type="button"
                            onClick={handleGenerateBorderel}
                            disabled={loading}
                            className="rounded-sm border border-black bg-black px-4 py-2 text-sm font-medium text-white hover:bg-[#1b1b18] disabled:opacity-60 dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                        >
                            {loading ? 'Generating…' : 'Generate borderel'}
                        </button>
                        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                    </section>

                    {borderel && (
                        <section className="rounded-lg border border-[#e3e3e0] bg-white p-4 text-sm shadow-sm dark:border-[#3E3E3A] dark:bg-[#161615]">
                            <h2 className="mb-3 text-base font-semibold">Borderel</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-[#e3e3e0] text-xs uppercase tracking-wide text-[#706f6c] dark:border-[#3E3E3A] dark:text-[#A1A09A]">
                                            <th className="py-2 pr-4">Price type</th>
                                            <th className="py-2 pr-4 text-right">Quantity</th>
                                            <th className="py-2 pr-4 text-right">Gross</th>
                                            <th className="py-2 pr-4 text-right">Costs</th>
                                            <th className="py-2 pr-0 text-right">Net</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borderel.per_price_type.map((row) => (
                                            <tr key={`${row.price_type_id}-${row.price_type_name}`} className="border-b border-[#f1f1ee] last:border-0 dark:border-[#3E3E3A]">
                                                <td className="py-2 pr-4">{row.price_type_name}</td>
                                                <td className="py-2 pr-4 text-right">{row.quantity}</td>
                                                <td className="py-2 pr-4 text-right">€ {formatAmount(row.gross)}</td>
                                                <td className="py-2 pr-4 text-right">€ {formatAmount(row.costs)}</td>
                                                <td className="py-2 pr-0 text-right font-medium">€ {formatAmount(row.net)}</td>
                                            </tr>
                                        ))}
                                        <tr className="border-t border-[#e3e3e0] font-semibold dark:border-[#3E3E3A]">
                                            <td className="py-2 pr-4">Total</td>
                                            <td className="py-2 pr-4 text-right"></td>
                                            <td className="py-2 pr-4 text-right">€ {formatAmount(borderel.totals.gross)}</td>
                                            <td className="py-2 pr-4 text-right">€ {formatAmount(borderel.totals.costs)}</td>
                                            <td className="py-2 pr-0 text-right">€ {formatAmount(borderel.totals.net)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
