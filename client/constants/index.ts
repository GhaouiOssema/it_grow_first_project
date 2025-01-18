export const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#works", label: "Works" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
];

export const pricingPlans = [
    {
        name: "Silver Package",
        price: "99",
        description: [
            "1 Hour Photography",
            "60 - 100 images / shoot",
            "Password protected gallery on personalized website",
        ],
        imageAlt: "Silver",
        imageSrc: "/pricing/img-1.png",
    },
    {
        name: "Gold Package",
        price: "199",
        description: [
            "5 Hour Photography",
            "100 - 200 images / shoot",
            "Password protected gallery on personalized website",
        ],
        imageAlt: "Gold",
        imageSrc: "/pricing/img-2.png",
        cardClass: true,
    },
    {
        name: "Platinum Package",
        price: "299",
        description: [
            "10 Hour Photography",
            "200 - 400 images / shoot",
            "Password protected gallery on personalized website",
        ],
        imageAlt: "Platinum",
        imageSrc: "/pricing/img-3.png",
    },
];

export const images = [
    "/herosection/car_image_1.jpg",
    "/herosection/car_image_2.jpg",
    "/herosection/car_image_3.jpg",
    "/herosection/car_image_4.jpg",
    "/herosection/car_image_5.jpg",
];

export const items = [
    {
        text: "Food Photography",
        color: "text-brand-color",
        lineColor: "bg-brand-color",
        description:
            "Transforming culinary creations into visual masterpieces, our food photography captures the essence of flavor, texture, and presentation. Perfect for restaurants, cookbooks, or food brands looking to make an unforgettable impression.",

        image: "/services/service1.png",
    },
    {
        text: "Wedding Photoshoot",
        color: "text-brand-color",
        lineColor: "bg-brand-color",
        description:
            "Relive your special day through stunning, heartfelt imagery. From candid moments to elegant portraits, our wedding photography preserves every precious memory in timeless detail.",
        image: "/services/service2.png",
    },
    {
        text: "Product Art",
        color: "text-brand-color",
        lineColor: "bg-brand-color",
        description:
            "Bring your products to life with striking, creative photography that highlights their uniqueness. Whether for e-commerce, advertising, or branding, we deliver visuals that captivate and inspire.",
        image: [
            {
                img: "/services/service3-1.jpg",
            },
            {
                img: "/services/service3-2.jpg",
            },
            {
                img: "/services/service3-3.jpg",
            },
        ],
    },
];
