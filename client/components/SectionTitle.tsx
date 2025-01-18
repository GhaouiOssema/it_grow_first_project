import React from "react";

const SectionTitle = ({
    title,
    subTitle,
    className,
}: {
    title: string;
    subTitle: string;
    className: string;
}) => {
    return (
        <div className={`${className} mb-12 relative`}>
            <h2 className="text-4xl font-bold mb-2 font-playfair relative">
                {title}
            </h2>
            <p className="text-[#B5B5BA] font-playfair">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;
