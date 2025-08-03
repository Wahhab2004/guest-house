"use client";
import { useState } from 'react';


const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log({ rating, name, email, review });
  };

  return (
    <div className="mx-auto w-11/12 xl:w-full md:max-w-7xl lg:mt-4 px-6 py-4 mt-4 bg-white shadow-md rounded-md border">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">Submit Your Review</h2>
      
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <span className="mr-2">Add Your Rating</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              className={`w-6 h-6 cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-5.878 3.09 1.121-6.545L.243 6.545l6.58-.957L10 0l2.177 5.588 6.58.957-4.768 4.908 1.121 6.546L10 15z" />
            </svg>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full lg:w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='john doe'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-3 py-2 border lg:w-1/4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='johndoe@example.com'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="review">
            Write Your Review
          </label>
          <textarea
            id="review"
            className="block w-full lg:h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder='Write Your Review...'
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Leave Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
