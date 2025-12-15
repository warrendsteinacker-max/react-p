import React from 'react';
import Home from './components/Home'; // FIX: Specify path
import PostPage from './components/PostPage'; // FIX: Specify path (using correct PascalCase name)
import Editpage_for_post from './components/Editpage_for_post'; // FIX: Specify path
import { DataProvider } from './context/DataContext'; // CRITICAL: Import the state provider

import {
    BrowserRouter, 
    Routes, 
    Route, 
    Link,
    NavLink
} from 'react-router-dom'; // FIX: Quotes added

function App() {
    return (
        // CRITICAL FIX: Wrap the entire application with the DataProvider
        <DataProvider>
            <BrowserRouter>
                {/* Optional: Navigation Bar outside of Routes */}
                <nav style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <Link to="/">Home (List)</Link> | 
                    <Link to="/postdata">Create Item</Link>
                </nav>

                <Routes>
                    {/* CRITICAL FIX: Use JSX element format: element={<Component />} */}
                    <Route path="/" element={<Home />} />
                    <Route path="/postdata" element={<PostPage />} />
                    {/* CRITICAL FIX: Use dynamic parameter for editing specific posts */}
                    <Route path="/edit/:id" element={<Editpage_for_post />} /> 
                    
                    {/* Optional: Add a 404 catch-all route */}
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;