import React, { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxParticipants: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-white mb-2">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-white mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-white mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-white mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-white mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
              required
            >
              <option value="">Select category</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <div>
            <label htmlFor="maxParticipants" className="block text-white mb-2">
              Max Participants
            </label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-white mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#111] text-white border border-gray-700 focus:border-red-600 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
