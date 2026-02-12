tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                display: ["Cinzel", "serif"],
                body: ["Inter", "sans-serif"],
                accent: ["Playfair Display", "serif"],
            },
            colors: {
                ink: "#0a0a0a",
                charcoal: "#1a1a1a",
                graphite: "#2a2a2a",
                silver: "#a1a1a1",
                "light-gray": "#d4d4d4",
                accent: "#e5e5e5",
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s ease-out forwards",
                "fade-in": "fadeIn 1s ease-out forwards",
                "scale-in": "scaleIn 0.6s ease-out forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
            },
        },
    },
};
