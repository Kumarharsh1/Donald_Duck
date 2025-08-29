# Portfolio Backend

Node.js/Express backend API for my MERN stack portfolio website, featuring MongoDB integration, RESTful APIs, and server-side functionality.

## 🚀 API Base URL
`https://kumarharshportfoilo.up.railway.app/api`

## 🛠️ Built With

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 API Features

- RESTful API design
- MongoDB database integration
- Visitor counter system
- Contact form processing
- Project data management
- CORS enabled for frontend integration
- Error handling middleware

## 🗃️ Database Models

### Visitor Model
```javascript
{
  count: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}
