const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para que o express entenda JSON no corpo das requisições

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});