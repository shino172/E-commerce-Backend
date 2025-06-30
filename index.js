const express = require('express');
const cors = require ('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/user'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`))