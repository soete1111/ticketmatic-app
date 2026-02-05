## Ticketmatic Studio Assessment App

This is a small Laravel + Inertia (React/TSX) application that integrates with the Ticketmatic API to list events, show an event detail page, and generate a simple borderel (financial overview) per event.

### Prerequisites

- PHP 8.2+ (with required Laravel extensions)
- Composer
- Node.js and npm (or pnpm/yarn)
- A Ticketmatic test account with read‑only API credentials (for real API calls)

### Running the project

In the project root:

```bash
composer run dev
```

By default the app will be available at `http://127.0.0.1:8000`.

### Using the application

- Visit `/`:
  - Shows a list of events (sample data or real Ticketmatic events, depending on `.env`).
- Click on an event:
  - Navigates to `/events/{id}` with basic event information.
- On the event detail page:
  - Click **“Generate borderel”** to fetch the borderel data and display a small table with:
    - Quantity, gross, costs, and net per price type
    - Totals at the bottom

All pages are rendered via Inertia using React/TSX components in `resources/js/pages`.

### Notes

The `http://127.0.0.1:8000` shows a list of real data from the test API. Ran into some issues connecting to the API through my code, that's why you'll see some hard coded sample data when clicking to see the details page (`/events/{id}`). Same with the borderel generation on the detail page which is just some sample data an doesn't have an actual call to get the Orders data.

