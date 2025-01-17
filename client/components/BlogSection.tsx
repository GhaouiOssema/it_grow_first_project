"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import axios from "axios";
import { BlogPost } from "@/types";
import { Badge } from "./ui/badge";

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

    console.log(posts);

    return (
        <section className="container py-16" id="blog">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-[#11204D] font-playfair mb-3">
                    From The Blog
                </h1>
                <p className="text-gray-500 font-medium">
                    Stories, Tips, and Inspiration
                </p>
            </div>
            <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
                {posts.map((post, i) => (
                    <Card
                        key={i}
                        className="overflow-hidden border border-[#11204D26] rounded-[10px] px-3">
                        <div className="relative">
                            <Badge className="absolute top-4 left-6 z-10 text-[14px] font-normal leading-[15.61px] py-[5px] tracking-[1px] px-[10px] bg-purple-600 hover:bg-purple-700 uppercase">
                                {post.category}
                            </Badge>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads${post.imageUrl}`}
                                alt={post.title}
                                width={400}
                                height={300}
                                className="object-cover aspect-3/4 rounded-[10px]"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-3 text-sm md:text-lg text-[#11204D59]">
                                <time>
                                    {new Date(
                                        post.createdAt
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </time>
                                <span className="text-lg">•</span>
                                <span>by {post.author}</span>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-[#1a237e] w-2/3 ">
                                {post.title}
                            </h3>
                            <div className="">
                                <a
                                    href={`/blog/${post.slug}`}
                                    className="text-brand-color hover:text-purple-700 font-medium">
                                    Continue Reading
                                </a>
                                <div className="w-6 h-[2px] bg-[#6138BD]" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
