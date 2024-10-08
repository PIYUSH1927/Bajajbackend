const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const USER_INFO = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};


app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("Root route is working!");
});

app.get('/api/get_code', (req, res) => {
    res.status(200).json({ operation_code: "12345" });
});

app.post('/api/post_data', (req, res) => {
    const data = req.body.data || [];

  
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));


    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    const response = {
        is_success: true,
        user_id: USER_INFO.user_id,
        email: USER_INFO.email,
        roll_number: USER_INFO.roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
