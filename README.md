# Hococo posts exercise

This project is a solution to the Hococo Frontend Developer coding challenge. It demonstrates an infinite scrolling post feed with the ability to create and edit posts using the [DummyJSON API](https://dummyjson.com/docs/posts).

## 🔧 Features

- Fetches posts in chunks (`limit=20`) with infinite scrolling.
- Prevents duplicate fetches using a deduplicated skip tracker.
- Responsive layout with basic CSS (no Tailwind or UI framework used).
- Ability to add and edit posts with a modal form.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm (recommended)

To run this project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/esteficodes/hococo-exercise
   cd hococo-exercise
   ```

### Installation

```bash
npm install
```

### Running the app

```bash
npm run dev
```

Then open your browser at http://localhost:5173

### Project structure

```
src/
├── components/
│   ├── PostCard.tsx      # Individual post component
│   ├── PostForm.tsx      # Modal form to add/edit posts
│   └── PostList.tsx      # Main feed with infinite scrolling
├── App.tsx               # Root component
├── main.tsx              # Vite entry point
├── index.css             # Global styles
└── App.css               # Layout & overrides

```

### What would I improve if I had more time

- The overall design could use a lot of improvement. I would reconsidering the overall measurements and spacing, as for example the forms margins and the hovering over effect, which looks off. Also, the spacing between the pencil icon and the text. The responsiveness of the modal form it's also pending. I tried to prioritize delivering a functional project within the indicated timeframe, which clearly went on detriment of the design.
- I would have used Tailwind, which I desisted of using after I ran into a long time-consuming issue.
- Adding more features had to be left out due to lack of time, but I would have added the search functionality by adding a text field input, where users can search for a query, using JavaScript filtering and displaying filteredPosts instead of Posts.
- Error handling, by wrapping the fetch calls in try...catch blocks and showing a message if the API fails.
- Displaying extra posts attributes, by looking at the DummyJSON API and including fields like tags, reactions, and views. I would update my postCard to show them.
- Adding a select dropdown for sorting and an OnChange event to sort the posts array accordingly before rendering.

### Tech stack

- React + TypeScript

- Vite (build tool)

- CSS Modules (custom)

- DummyJSON API (mock backend)
