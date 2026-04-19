# CivicDataSpace

A modern, responsive dataset discovery platform built for [CivicDays](https://civicdays.in). It enables users to search, filter, sort, and browse civic datasets across sectors like Climate, Disaster Risk Reduction, Energy Transition, and more.

---

## Features

- **Dataset Search** — Full-text search with debounced input
- **Advanced Filters** — Filter by Sectors, Data Type (Formats), Tags, and Geographies
- **Sort & Order** — Sort datasets by most recent or alphabetically
- **Grid / List View** — Toggle between card grid and table row layout
- **Dark / Light Theme** — Toggle between dark and light mode, managed via Redux
- **Pagination** — Navigate across paginated results
- **Loading Skeletons** — Smooth loading states during API fetch
- **Responsive Design** — Mobile-friendly layout with collapsible filter sidebar, tested down to 320px

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | React framework (App Router) |
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Redux Toolkit](https://redux-toolkit.js.org) | Global state management |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [Lucide React](https://lucide.dev) | Icon library |
| [Jest 29](https://jestjs.io) | Unit testing |
| [Testing Library](https://testing-library.com) | Component & hook testing |

---

## Project Structure

```
CivicDataSpace/
├── app/
│   ├── globals.css         # Global styles + dark mode overrides
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Entry page
├── src/
│   ├── components/
│   │   ├── DatasetListing.tsx   # Main listing container
│   │   ├── DatasetCard.tsx      # Grid card view
│   │   ├── DatasetRow.tsx       # List row view
│   │   ├── FiltersSidebar.tsx   # Filter panel
│   │   ├── SearchBar.tsx        # Search input
│   │   ├── SortDropdown.tsx     # Sort controls
│   │   ├── ViewToggle.tsx       # Grid/List toggle
│   │   ├── ThemeToggle.tsx      # Dark/Light mode toggle button
│   │   ├── ThemeProvider.tsx    # Applies dark class to <html> from Redux state
│   │   ├── Pagination.tsx       # Page navigation
│   │   ├── Header.tsx           # Site header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── LoadingSkeleton.tsx  # Loading state UI
│   │   ├── States.tsx           # Empty/error states
│   │   └── StoreProvider.tsx    # Redux provider wrapper
│   ├── hooks/
│   │   ├── redux.ts             # Typed Redux hooks
│   │   └── useDebounce.ts       # Debounce hook for search
│   ├── lib/
│   │   └── api.ts               # API client (CivicDays API)
│   ├── store/
│   │   ├── appSlice.ts          # Filters, view mode & theme state
│   │   └── index.ts             # Redux store setup
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces (Dataset, Filters, ViewMode, Theme)
│   └── __tests__/
│       ├── api.test.ts              # API client unit tests
│       ├── appSlice.test.ts         # Redux slice unit tests
│       ├── DatasetCard.test.tsx     # DatasetCard component tests
│       ├── DatasetRow.test.tsx      # DatasetRow component tests
│       ├── FiltersSidebar.test.tsx  # FiltersSidebar component tests
│       ├── LoadingSkeleton.test.tsx # LoadingSkeleton component tests
│       ├── Pagination.test.tsx      # Pagination component tests
│       ├── SearchBar.test.tsx       # SearchBar component tests
│       ├── SortDropdown.test.tsx    # SortDropdown component tests
│       ├── States.test.tsx          # Empty/Error state tests
│       ├── useDebounce.test.ts      # useDebounce hook tests
│       ├── ViewToggle.test.tsx      # ViewToggle component tests
│       └── testUtils.tsx            # Shared render helper with Redux store
└── public/
    └── assets/                  # Brand logos and icons
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm / yarn / pnpm / bun

### Installation

```bash
git clone https://github.com/your-username/CivicDataSpace.git
cd CivicDataSpace
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

### Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## API

Datasets are fetched from the CivicDays DataKeep API:

```
GET https://api.datakeep.civicdays.in/api/search/dataset/
```

Supported query parameters:

| Parameter | Description |
|---|---|
| `query` | Full-text search keyword |
| `sectors` | Comma-separated sector filter |
| `tags` | Comma-separated tag filter |
| `formats` | Comma-separated format filter |
| `geographies` | Comma-separated geography filter |
| `page` | Page number (default: `1`) |
| `size` | Results per page (default: `9`) |
| `sort` | `recent` or `alphabetical` |
| `order` | `asc` or `desc` |

---

## License

This project is private and intended for use within the CivicDays ecosystem.
