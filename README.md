Overview

Libertalia Properties is a premier real estate platform that connects property buyers, sellers, and renters in an easy-to-use online marketplace. Whether you're looking to buy your dream home, sell a property, or find a rental, Libertalia Properties provides a seamless experience with a comprehensive property search engine, user-friendly interface, and secure transaction management.

Key Features

Property Search and Filters: Advanced search functionality that allows users to search for properties by location, price, type, and other criteria.
User Accounts: Secure user authentication (sign-up/sign-in) allowing users to manage their profile and track their interactions with listings.
Property Listings: Property sellers and agents can list properties with rich media such as images, videos, and detailed descriptions.
Interactive Maps: Integrated maps showing property locations with intuitive zoom and filtering options.
Contact Agents: Contact options directly through the platform for users to reach out to property agents for inquiries or to schedule viewings.
Real-Time Updates: Users can subscribe to property updates based on their search criteria to stay informed about new listings or changes.

Technologies Used

Frontend: Built using React.js and Next.js for fast, server-side rendering, and an optimized user experience.
Backend: Firebase for user authentication and real-time database management.
Maps: Google Maps API for displaying property locations.
Styling: Tailwind CSS for responsive design and customization.
Deployment: Deployed on Vercel for fast and reliable hosting.

Installation
Clone this repository:

bash
Copy code
git clone https://github.com/yourusername/libertalia-properties.git
cd libertalia-properties

Install dependencies:
bash
Copy code
npm install
Set up Firebase by creating a Firebase project and generating the necessary credentials for the Firebase API. Add the credentials in the .env.local file:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
Run the development server:

bash
Copy code
npm run dev
Visit the application at http://localhost:3000.

Usage
User Registration/Sign-in: New users can register or sign in using their email address. After signing in, they can access the property search features and manage their saved properties.
Searching for Properties: Use the search bar and filters to find properties based on location, price, type, and more.
Property Listings: Users can browse properties, view details, and contact the listing agent directly for more information.
Contributing


We welcome contributions from the community! If you'd like to contribute to the development of Libertalia Properties, follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them with clear commit messages.
Push your changes and create a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.
