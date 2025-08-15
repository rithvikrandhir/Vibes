# Vibes - Playlist Mapper

An interactive music visualization and playlist optimization tool that helps you create smooth-flowing playlists based on energy and mood metrics.

## Features

- **Interactive Scatter Plot**: Visualize your music library on energy vs mood axes
- **Smart Playlist Ordering**: AI-powered suggestions for optimal song flow
- **Genre-Aware Optimization**: Configurable genre transition penalties
- **Manual Reordering**: Drag and drop interface for custom playlist creation
- **Export Functionality**: Save your playlist order as a text file
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React

## Getting Started

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy!

### GitHub Pages

1. Add this to your `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/yourrepo",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

2. Install gh-pages: `npm install --save-dev gh-pages`
3. Run: `npm run deploy`

### Manual Deployment

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Ensure your server is configured to serve `index.html` for all routes (SPA routing)

## Project Structure

```
src/
├── components/ui/     # Reusable UI components
├── lib/              # Utility functions
├── App.jsx           # Main application component
├── main.jsx          # React entry point
└── index.css         # Global styles and Tailwind imports
```

## Customization

- **Data**: Replace the `seedSongs` array in `App.jsx` with your own music data
- **Styling**: Modify Tailwind classes or add custom CSS
- **Charts**: Customize the Recharts configuration for different visualizations
- **Algorithms**: Adjust the playlist optimization logic in the helper functions

## License

ISC
