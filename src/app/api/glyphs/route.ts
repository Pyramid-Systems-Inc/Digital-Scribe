/**
 * GET /api/glyphs
 *
 * Retrieves glyph data for the learning section.
 * Implementation will be added in Phase 1.6.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    // Placeholder implementation
    return NextResponse.json({
        glyphs: [],
    });
}