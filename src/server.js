import express from 'express';

export const D = []



const app = express();
const PORT = 3000;

app.use(express.json());


import express from 'express';

// 1. Initial Data (must be defined outside the route)
let D = [
    { id: 1, name: 'Apple', count: 5, created: '2025-01-01' },
    { id: 2, name: 'Banana', count: 12, created: '2025-01-02' }
]; 

const app = express();
const PORT = 3000;

// 2. Middleware (Crucial for reading req.body)
app.use(express.json()); 

// --- PUT Route (Update Logic) ---
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



app.get('/api/data?filter=:criteria', (req, res) => {
    const criteria = req.params.criteria;
    const filtered = D.filter(item => item.name.includes(criteria));
    res.json({ items: filtered });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



