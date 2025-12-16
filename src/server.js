import express from 'express';

const D = []

const app = express();
const PORT = 3000;

let nextId = D.length > 0 ? Math.max(...D.map(item => item.id)) + 1 : 1;
// 2. Middleware (Crucial for reading req.body)
app.use(express.json()); 

app.get('/api/data', (req, res) => {
    res.send(D)
})

app.post('/api/data', (req, res) => {
    // 1. Destructure data from the request body (requires express.json() middleware)
    const { count, name, description } = req.body;

    // 2. Input Validation (Best Practice)
    if (!name || count === undefined || description === undefined) {
        return res.status(400).json({ error: 'Missing required fields: name, count, or description.' });
    }

    // 3. Generate Unique ID (CRITICAL FIX)
    const newitem = {
        id: nextId++, // Assign unique ID and increment the counter
        name: name,
        count: Number(count), // Ensure count is treated as a number
        description: description
    };

    // 4. Update the Data Storage
    D.push(newitem);

    // 5. Send a Success Response (CRITICAL FIX)
    // Status 201 Created is the standard for successful POST requests.
    return res.status(201).json(newitem);
});

app.put('/api/data/:id', (req, res) => {
    // 3. FIX: Convert ID to a number for comparison
    const { count, name, description } = req.body;
    const targetId = parseInt(req.params.id); 
    
    // Find the index of the item
    const itemIndex = D.findIndex(i => i.id === targetId);
    
    // 4. ERROR HANDLING: Check if the item exists
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }
    
    // 5. UPDATE: Merge old data with new data from the body
    const existingItem = D[itemIndex];
    
    const updatedItem = {
        ...existingItem, // Keep old properties (like 'created')
        count,     // Apply new data (e.g., name, count)
        name,
        description, // Add metadata
    };
    
    // 6. Replace the old item in the array
    D[itemIndex] = updatedItem; 
    
    // 7. Success Response
    return res.status(200).json({ 
        message: `Item with ID ${targetId} updated successfully.`, 
        item: updatedItem 
    });
});

app.delete('/api/data/:id', (req, res) => {
    // 1. Convert the ID from the URL parameter to a number
    const itemId = parseInt(req.params.id);

    // 2. Find the index of the item with the matching ID (CRITICAL FIX)
    const indexToDelete = D.findIndex(item => item.id === itemId);

    // 3. Handle 'Not Found' Case
    if (indexToDelete === -1) {
        // Status 404 Not Found if the item doesn't exist
        return res.status(404).json({ error: `Item with ID ${itemId} not found.` });
    }

    // 4. Delete the item using the found index
    // D.splice(indexToDelete, 1) -> Start at indexToDelete, delete 1 item
    D.splice(indexToDelete, 1);

    // 5. Send Success Response (Status 204 No Content is standard for DELETE success)
    return res.status(204).send(); 
});



// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



