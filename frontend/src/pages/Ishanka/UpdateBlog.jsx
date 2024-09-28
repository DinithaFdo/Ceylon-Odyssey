import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateBlogForm() {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        image: '',
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            return;
        }

        // Fetch the blog data by id
        axios.get(`http://localhost:5000/blog/get/${id}`)
            .then((res) => {
                setBlog(res.data); // Set the blog data to the state
                setLoading(false);  // Set loading to false after data is loaded
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }));
    };

    const Navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the blog data with the new values
        axios.put(`http://localhost:5000/blog/update/${id}`, blog)
            .then((res) => {
                alert('Blog updated successfully!');
                Navigate('/dashboard'); // Redirect to the blog list page
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Wait for the blog data to load before rendering the form
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Update Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title} // Set the value to the blog title
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={blog.author} // Set the value to the blog author
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        value={blog.content} // Set the value to the blog content
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="8"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={blog.image} // Set the value to the blog image
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
}
