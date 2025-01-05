const express = require('express');
const config = require('./config/env');
const PORT = config.PORT;
const connectToDatabase = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoute');
const friendRequestRoutes = require('./routes/FriendRequestRoutes');
const recommendationRoutes = require('./routes/RecommendationRoutes');
const uploadRoutes = require('./routes/ImagePost');
const cors = require('cors');

const app = express();

connectToDatabase();

const corsOptions = {
    origin: config.FrontendUrl,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friend-requests', friendRequestRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api', (req, res) => {
    res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
    console.log("Server is working http://localhost:" + PORT);
});
