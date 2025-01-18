"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import axios from "axios";
import { BlogPost } from "@/types";
import { Badge } from "./ui/badge";
import SectionTitle from "./SectionTitle";

const BlogSection = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog`
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8" id="blog">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="From The Blog"
                    subTitle="Stories, Tips, and Inspiration"
                    className="text-center"
                />

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-10">
                    {posts.map((post, i) => (
                        <div key={i} className="relative ">
                            <div className="absolute top-[7rem] -translate-y-1/2 w-full px-4">
                                <div className="relative w-full h-[300px] ">
                                    <Badge className="absolute top-4 left-4 z-10 text-xs sm:text-sm font-normal leading-[15.61px] py-[5px] tracking-[1px] px-[10px] bg-purple-600 hover:bg-purple-700 uppercase">
                                        {post.category}
                                    </Badge>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads${post.imageUrl}`}
                                        alt={post.title}
                                        fill
                                        className="object-cover rounded-[10px]"
                                    />
                                </div>
                            </div>
                            <Card className="pt-64 mb-20 overflow-hidden border border-[#11204D26] rounded-[10px] px-3">
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm text-[#11204D59]">
                                        <time>
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </time>
                                        <span className="text-md">•</span>
                                        <span>by {post.author}</span>
                                    </div>
                                    <h3 className="mb-4 text-base sm:text-lg font-bold text-[#1a237e] w-[70%]">
                                        {post.title}
                                    </h3>
                                    <div>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="text-brand-color hover:text-purple-700 font-medium text-sm sm:text-base">
                                            Continue Reading
                                        </a>
                                        <div className="w-6 h-[2px] bg-[#6138BD] mt-1" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
