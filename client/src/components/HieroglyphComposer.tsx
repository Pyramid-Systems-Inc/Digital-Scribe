import { useState, useEffect } from 'react';
import { translateText, Glyph } from '../services/api';

export const HieroglyphComposer = () => {
    // State
    const [input, setInput] = useState('');
    const [glyphs, setGlyphs] = useState<Glyph[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Debounce Logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!input.trim()) {
                setGlyphs([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const result = await translateText(input);
                setGlyphs(result);
            } catch (err) {
                setError("Failed to translate. Is the server running?");
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* INPUT SECTION */}
            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your name..."
                    style={{
                        fontSize: '1.5rem',
                        padding: '10px',
                        width: '80%',
                        borderRadius: '8px',
                        border: '2px solid #ccc'
                    }}
                />
            </div>

            {/* ERROR DISPLAY */}
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            {/* LOADING STATE */}
            {isLoading && <div>Translating...</div>}

            {/* RESULTS DISPLAY */}
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: '10px',
                minHeight: '100px',
                border: '1px dashed #ccc',
                padding: '20px'
            }}>
                {glyphs.map((g, index) => (
                    <img 
                        key={`${index}-${g.glyphId}`}
                        src={g.imageUrl} 
                        alt={g.description}
                        title={`${g.phonetic} - ${g.description}`}
                        style={{ width: '60px', height: '60px' }}
                    />
                ))}
            </div>
            
            {glyphs.length === 0 && !isLoading && input.trim() !== '' && (
                 <p>No glyphs found (Try standard English letters)</p>
            )}
        </div>
    );
};