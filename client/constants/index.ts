import { Testimonial } from "@/types";

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
    "/car_image_1.jpg",
    "/car_image_2.jpg",
    "/car_image_3.jpg",
    "/car_image_4.jpg",
    "/car_image_5.jpg",
];

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Hans Witherspoon",
        avatar: "/images/avatar.jpg",
        quote: "Extremely professional, unique and enjoyable. The effort taken to ensure adherence to our requirements ensured the optimum outcome.",
        rating: 5,
    },
];
