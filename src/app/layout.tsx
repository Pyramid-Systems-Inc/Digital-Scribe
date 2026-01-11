import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "The Digital Scribe 2.0",
    description:
        "A museum-grade, scrollytelling web experience that translates modern text into Ancient Egyptian hieroglyphs displayed in a dynamically rendered cartouche.",
    keywords: [
        "hieroglyphs",
        "Ancient Egypt",
        "translator",
        "cartouche",
        "Egyptian",
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}