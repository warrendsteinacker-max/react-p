import express from 'express';

const D = []

const app = express();
const PORT = 3000;

// 2. Middleware (Crucial for reading req.body)
app.use(express.json()); 

app.get('/api/data', (req, res) => {
    res.send(D)
})
app.put('/api/data/:id', (req, res) => {
    // 3. FIX: Convert ID to a number for comparison
    const {count} = req.body;
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
        updatedAt: new Date().toISOString() // Add metadata
    };
    
    // 6. Replace the old item in the array
    D[itemIndex] = updatedItem; 
    
    // 7. Success Response
    return res.status(200).json({ 
        message: `Item with ID ${targetId} updated successfully.`, 
        item: updatedItem 
    });
});



// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



