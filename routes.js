const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/calculate-distance', async (req, res) => {
    const { addressA, addressB } = req.query;

    if (!addressA || !addressB) {
        return res.status(400).json({ error: 'Please provide both addressA and addressB.' });
    }

    try {
        const responseA = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressA)}&format=json`);
        const responseB = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressB)}&format=json`);

        if (responseA.data.length === 0 || responseB.data.length === 0) {
            return res.status(404).json({ error: 'One or both addresses not found.' });
        }

        const latA = responseA.data[0].lat;
        const lonA = responseA.data[0].lon;
        const latB = responseB.data[0].lat;
        const lonB = responseB.data[0].lon;

        // Calculando a distância entre os dois pontos
        const distance = calculateDistance(latA, lonA, latB, lonB);

        return res.json({ distance });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

function calculateDistance(latA, lonA, latB, lonB) {
    const R = 6371; // Raio da Terra em km
    const dLat = (latB - latA) * (Math.PI / 180);
    const dLon = (lonB - lonA) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(latA * (Math.PI / 180)) * Math.cos(latB * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
