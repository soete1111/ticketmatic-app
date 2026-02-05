import { Head, Link } from '@inertiajs/react';

type EventSummary = {
    id: number;
    name: string;
    startts?: string | null;
};

type Props = {
    events: EventSummary[];
};

export default function Welcome({ events }: Props) {
    return (
        <>
            <Head title="Events" />
            <div className="min-h-screen bg-[#FDFDFC] px-6 py-8 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-8">
                        <h1 className="text-2xl font-semibold">Ticketmatic events</h1>
                        <p className="mt-2 text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            Select an event to see its details and generate a borderel.
                        </p>
                    </header>

                    <section className="rounded-lg border border-[#e3e3e0] bg-white p-4 shadow-sm dark:border-[#3E3E3A] dark:bg-[#161615]">
                        {events.length === 0 ? (
                            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                                No events could be loaded from Ticketmatic. Make sure your API credentials are configured.
                            </p>
                        ) : (
                            <ul className="divide-y divide-[#e3e3e0] dark:divide-[#3E3E3A]">
                                {events.map((event) => (
                                    <li key={event.id} className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="text-sm font-medium">{event.name}</p>
                                            {event.startts && (
                                                <p className="text-xs text-[#706f6c] dark:text-[#A1A09A]">
                                                    Starts at: {event.startts}
                                                </p>
                                            )}
                                        </div>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black hover:bg-black hover:text-white dark:border-[#eeeeec] dark:text-[#eeeeec] dark:hover:border-white dark:hover:bg-white dark:hover:text-[#1C1C1A]"
                                        >
                                            View details
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}
