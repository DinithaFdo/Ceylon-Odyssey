import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function IndividualBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`http://localhost:5000/blog/get/${id}`).then((res) => {
            setBlog(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <div className="max-w-3xl mx-auto mt-6 md:mt-10 pt-20 px-4">
            <h1 className="text-4xl font-bold text-center mb-8">{blog.title}</h1>
            
            <div className="mb-8 text-center">
                <p className="text-lg text-gray-600">
                    By <span className="font-semibold">{blog.author}</span> | 
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>
            </div>
            
            {blog.image && (
                <img
                    src={`http://localhost:5000/BlogImages/${blog.image}`}
                    alt={blog.title}
                    className="w-full h-auto object-cover rounded-lg mb-8 shadow-lg"
                />
            )}
            
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8">
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                    {blog.content}
                </p>
            </div>
            
            <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Share
                </button>
            </div>
        </div>
    );
}