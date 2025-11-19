import axios from 'axios';

// 1. Define the Shape of the Data (Must match Server Domain)
export interface Glyph {
    glyphId: string;
    phonetic: string;
    unicode: string;
    description: string;
    category: string;
    imageUrl: string;
}

// 2. Configure Axios
// Note: In production, this URL comes from env vars. For MVP, hardcode localhost.
const API_URL = 'http://localhost:8080/api/v1';

export const translateText = async (text: string): Promise<Glyph[]> => {
    try {
        const response = await axios.post<Glyph[]>(`${API_URL}/translate`, { text });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};