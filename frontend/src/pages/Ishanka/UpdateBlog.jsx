import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateBlog() {
    const { id } = useParams();

    const [values, setValues] = useState({
        id: id,
        title: '',
        content: '',
        author: '',
        image: null // Set to null initially
    });

    useEffect(() => {
        // Fetch blog data using the blog ID
        axios.get(`http://localhost:5000/blog/get/${id}`)
            .then((response) => {
                const blogData = response.data.blog;
                setValues({
                    ...values, // Keep other fields in case they're already updated
                    title: blogData.title,
                    content: blogData.content,
                    author: blogData.author,
                    image: blogData.image // Set image URL
                });
            })
            .catch((err) => {
                console.error('Error fetching blog:', err);
            });
    }, [id]);

    const navigate = useNavigate();

    const updateBlog = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'image' && values[key] instanceof File) {
                formData.append(key, values[key]);
            } else if (key !== 'image') {
                formData.append(key, values[key]);
            }
        });

        axios.put(`http://localhost:5000/blog/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert("Blog Updated Successfully");
            navigate('/blog-list');
        }).catch((err) => {
            console.error('Error:', err);
        });
    };

    return (
        <form onSubmit={updateBlog} encType="multipart/form-data" className="max-w-4xl p-6 mx-auto bg-gray-700 rounded-md shadow-md dark:bg-gray-800 mt-20" >
            <h1 className="text-3xl font-bold mb-7 text-white">Update Blog</h1>

            <div className="grid grid-cols-2 gap-8">
                <div className="mb-8">
                    <label htmlFor="title" className="block mb-2 text-l font-medium text-white dark:text-white">Blog Title</label>
                    <input
                        type="text"
                        id="title"
                        className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.title}
                        onChange={(e) => setValues({ ...values, title: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label htmlFor="author" className="block mb-2 text-l font-medium text-white dark:text-white">Author</label>
                    <input
                        type="text"
                        id="author"
                        className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.author}
                        onChange={(e) => setValues({ ...values, author: e.target.value })}
                        required
                    />
                </div>

                <div className="col-span-2 mb-8">
                    <label htmlFor="content" className="block mb-2 text-l font-medium text-white dark:text-white">Blog Content</label>
                    <textarea
                        id="content"
                        className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="8"
                        value={values.content}
                        onChange={(e) => setValues({ ...values, content: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label className="block mb-2 text-l font-medium text-white dark:text-white" htmlFor="image">Upload Image</label>
                    {values.image && (
                        <img src={values.image} alt="Blog" className="mb-4 max-h-32" />
                    )}
                    <input
                        name="image"
                        id="image"
                        type="file"
                        onChange={(e) => setValues({ ...values, image: e.target.files[0] })}
                    />
                </div>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                Update Blog
            </button>
        </form>
    );
}
