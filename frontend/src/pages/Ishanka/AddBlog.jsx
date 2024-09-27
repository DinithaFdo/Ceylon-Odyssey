import React, { useState } from 'react';
import axios from 'axios';

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogImage, setBlogImage] = useState(null); 
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function addBlog(e) {
    e.preventDefault();

    const blog = {
      title,
      content,
      author,
      blogImage,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    axios.post("http://localhost:5000/blog/add", formData)
      .then(() => {
        setSuccessMessage('✅ Blog added successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
        setBlogImage(null);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      {successMessage && (
        <div className="mb-4 p-4 text-white bg-green-600 rounded-md text-center animate-bounce">
          {successMessage}
        </div>
      )}
      <section className="max-w-4xl p-6 mx-auto bg-gray-700 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add Blog</h1>

        <form onSubmit={addBlog}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setAuthor(e.target.value)}
              />
              {errors.author && <p className="text-red-500">{errors.author}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-white dark:text-gray-200" htmlFor="content">Content</label>
              <textarea
                id="content"
                className="block w-full px-4 py-2 mt-2"
                rows="5"
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && <p className="text-red-500">{errors.content}</p>}
            </div>

            <div>
              <label className="block mb-2 text-l font-medium text-white dark:text-white" htmlFor="blogImage">Upload Image</label>
              <input
                name="blogImage"
                className="block w-full p-2.5"
                id="blogImage"
                type="file"
                onChange={(e) => {
                  setBlogImage(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-6 py-2 leading-5 text-white bg-gray-500 rounded-md hover:bg-green-900">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddBlog;
