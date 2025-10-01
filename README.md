# RepRally Onboarding Prototype

A Next.js application for store registration with a multi-step form and fun competitors insights page.  
The app guides users through entering their store information, selecting their store type, and then provides an insights results page with competitive analysis and a CTA guiding them deeper into the app.

## Features

- **Multi-step Form**: Store information (name, address, contact) and store type selection
- **Google Places Integration**: Address autocomplete with NJ validation
- **Supabase Database**: Store types and competitor data storage
- **Form Validation**: Client-side with error handling
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Insights Dashboard**: Competitive analysis with podium visualization
- **Business Logic**:
  - Finds competitors within 5–50 miles using the Haversine formula
  - Filters by store type and excludes user’s own store
  - Ranks competitors by **rating → review count → distance**
  - Displays top 3 competitors on a podium (gold, silver, bronze)
- **User Experience**: Loading states, graceful error handling, and special styling when the user’s store appears
- **CTA**: Direct link to join RepRally

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file and set:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`: Your Google Places API key

### 2. Database Setup

1. Go to your Supabase project dashboard
2. Run the contents of `database-setup.sql` in the SQL Editor
3. Populate the `stores` table with CSV dump

**Schema Overview**:

- `store_types`: (id, name, display_name)
- `stores`: (id, name, google_place_id, latitude, longitude, state, type, google_rating, google_rating_count)

### 3. Google Places API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Places API
3. Create an API key and add it to `.env.local`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
