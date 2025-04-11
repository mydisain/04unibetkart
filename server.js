// ... existing imports ...
const cors = require('cors');

// ... other code ...

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',  // Development frontend
    'https://test.bookid.ee'  // Production frontend
  ],
  credentials: true
}));

// ... rest of your server code ...