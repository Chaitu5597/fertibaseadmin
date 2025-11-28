# Backend Integration Instructions

## Files Created

1. **models/Career.js** - Mongoose schema for career/job postings
2. **controllers/careerController.js** - Controller with all CRUD operations
3. **routes/careerRoutes.js** - Express routes for the API

## Integration Steps

### Step 1: Copy Files to Backend

Copy the files from `BACKEND_FILES` to your `fertice-backend` directory:

```
fertice-backend/
├── models/
│   └── Career.js          (copy from BACKEND_FILES/models/)
├── controllers/
│   └── careerController.js (copy from BACKEND_FILES/controllers/)
└── routes/
    └── careerRoutes.js     (copy from BACKEND_FILES/routes/)
```

### Step 2: Register Route in server.js

Add this to your `fertice-backend/server.js` file:

```javascript
// Import the career routes
const careerRoutes = require('./routes/careerRoutes');

// Register the route (add this with your other route registrations)
app.use('/api/Careers', careerRoutes);
```

**Example server.js structure:**

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/productRoutes'); // existing
const careerRoutes = require('./routes/careerRoutes');   // NEW

// Register routes
app.use('/api/products', productRoutes);  // existing
app.use('/api/Careers', careerRoutes);    // NEW - note the capital C

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fertibase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Step 3: Restart Backend Server

```bash
cd fertice-backend
npm start
```

or if using nodemon:

```bash
npm run dev
```

## API Endpoints

Once integrated, the following endpoints will be available:

- **GET** `/api/Careers` - Get all careers
- **GET** `/api/Careers/:id` - Get single career by ID
- **POST** `/api/Careers` - Create new career
- **PUT** `/api/Careers/:id` - Update career
- **DELETE** `/api/Careers/:id` - Delete career

## Testing

You can test the endpoints using:

1. **Browser** - Navigate to `http://localhost:5000/api/Careers`
2. **Postman** - Import and test all CRUD operations
3. **Frontend** - Use the JobManager page in your admin panel

## Sample Request Body (POST/PUT)

```json
{
  "category": "Research & Development",
  "title": "Senior Agronomist",
  "preview": "Join our R&D team to develop innovative agricultural solutions",
  "desc": "We are seeking an experienced agronomist...",
  "about": "This role involves leading research projects...",
  "responsibilities": [
    "Conduct field trials",
    "Analyze soil samples",
    "Develop crop management strategies"
  ],
  "requirements": [
    "Master's degree in Agronomy",
    "5+ years experience",
    "Strong analytical skills"
  ],
  "skills": ["Soil Science", "Crop Management", "Data Analysis"],
  "tools": ["GIS Software", "Statistical Analysis Tools"],
  "experience": "5+ years",
  "salary": "₹8L - ₹12L LPA",
  "location": "Hyderabad",
  "mode": "On-site",
  "type": "Full-Time",
  "positions": 2,
  "daysLeft": 45,
  "niceToHave": ["PhD in related field", "Published research"],
  "applyNote": "Please include research publications"
}
```

## Troubleshooting

### 404 Error
- Ensure route is registered in server.js
- Check that the path is `/api/Careers` (capital C)
- Verify server is running

### 500 Error
- Check MongoDB connection
- Verify model is properly imported
- Check server logs for detailed error

### CORS Error
- Ensure CORS is enabled in server.js
- Check that frontend URL is allowed
