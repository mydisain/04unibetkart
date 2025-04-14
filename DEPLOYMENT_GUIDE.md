# Deployment Guide for 04unibetkart

This guide provides step-by-step instructions for deploying the 04unibetkart application with:
- React frontend on zone.ee under test.bookid subdomain
- Node.js backend on render.com
- MongoDB Atlas as the database

## 1. MongoDB Atlas Setup

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (or use an existing one)
3. Set up database access:
   - Create a database user with read/write permissions
   - Note down the username and password
4. Set up network access:
   - Add your IP address to the IP access list
   - For production, allow access from anywhere (0.0.0.0/0)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority`)
   - Replace `<username>`, `<password>`, and `<dbname>` with your actual values

## 2. Backend Deployment to Render.com

1. Sign up or log in to [Render](https://render.com)
2. Click "New" and select "Web Service"
3. Connect your GitHub repository or upload your code
4. Configure the service:
   - Name: `04unibetkart-backend` (or any name you prefer)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select the appropriate plan (Free tier is available)
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string from Step 1
   - `NODE_ENV`: production
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `PORT`: 10000 (Render will automatically set the PORT environment variable)
   - Any other environment variables your application needs
6. Click "Create Web Service"
7. Wait for the deployment to complete
8. Note down the URL of your backend service (e.g., https://04unibetkart-backend.onrender.com)

## 3. Frontend Deployment to zone.ee

1. Prepare your build files:
   - The React app has already been built with `npm run build --prefix client`
   - Copy the `.htaccess` file from `zone_htaccess.txt` to the `client/build` directory when uploading

2. Upload to zone.ee:
   - Log in to your zone.ee control panel
   - Set up the subdomain test.bookid if it doesn't exist
   - Upload all files from the `client/build` directory to the root of your subdomain
   - Make sure to include the `.htaccess` file

3. Configure DNS:
   - In your zone.ee control panel, ensure that the DNS records for test.bookid.ee are properly configured
   - Typically, this would be a CNAME record pointing to your zone.ee hosting

## 4. Testing the Deployment

1. Test the backend:
   - Visit your Render.com backend URL (e.g., https://04unibetkart-backend.onrender.com)
   - You should see "API is running..." or be able to access API endpoints

2. Test the frontend:
   - Visit your zone.ee subdomain (e.g., https://test.bookid.ee)
   - The React app should load and be able to communicate with the backend

## 5. Troubleshooting

If you encounter issues:

1. Backend issues:
   - Check Render.com logs for any errors
   - Verify environment variables are set correctly
   - Ensure MongoDB connection is working

2. Frontend issues:
   - Check browser console for any errors
   - Verify that the API URL in the frontend is correctly pointing to your backend
   - Check if the `.htaccess` file is properly set up for SPA routing

3. Database issues:
   - Verify MongoDB Atlas network access settings
   - Check connection string is correct
   - Ensure database user has proper permissions

## 6. Maintenance

- Regularly check for security updates
- Monitor application performance
- Back up your MongoDB data regularly
