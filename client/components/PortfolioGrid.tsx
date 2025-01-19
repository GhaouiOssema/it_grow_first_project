"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "./SectionTitle";
import { Project } from "@/types";
import Loader from "./Loader";

const PortfolioGrid = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/projects`
                );
                setProjects(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="container py-16" id="works">
            <SectionTitle
                title="My Work"
                subTitle="A Glimpse Into My Creative World"
                className="text-center"
            />

            {!loading && projects ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {projects.map((project, i) => (
                        <div key={i} className="relative p-3">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/projects/${project.imageUrl}`}
                                alt={`Portfolio ${i + 1}`}
                                width={300}
                                height={300}
                                className="rounded-[10px] object-cover"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </section>
    );
};

export default PortfolioGrid;
