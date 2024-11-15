import React, { useEffect, useState } from 'react';

const EditTheyyam = ({ theyyamId, initialData, onUpdateSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    descriptions: '',
    img: null,
    imgs: null,
    popularity: '',
    story: '',
    god: '',
    temples: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    } else {
      fetchTheyyam();
    }
  }, [initialData, theyyamId]);

  const fetchTheyyam = async () => {
    try {
      const response = await fetch(`/api/theyyams?id=${theyyamId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch theyyam data');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching Theyyam:', error);
      setMessage('An error occurred while fetching theyyam data.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formDataToSend = new FormData();
      
      // non-file fields
      Object.keys(formData).forEach(key => {
        if (key !== 'img' && key !== 'imgs') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // single image upload
      const imgInput = document.querySelector('input[name="img"]');
      if (imgInput?.files.length > 0) {
        formDataToSend.append('img', imgInput.files[0]);
      }

      // multiple images upload
      const imgsInput = document.querySelector('input[name="imgs"]');
      if (imgsInput?.files.length > 0) {
        Array.from(imgsInput.files).forEach(file => {
          formDataToSend.append('imgs', file);
        });
      }

      const response = await fetch(`/api/theyyams?id=${theyyamId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update theyyam');
      }

      const result = await response.json();
      setMessage('Theyyam updated successfully!');
      
      if (onUpdateSuccess) {
        onUpdateSuccess(result);
      }
    } catch (error) {
      console.error('Error updating Theyyam:', error);
      setMessage(error.message || 'An error occurred while updating the theyyam.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full p-2 border rounded bg-white text-zinc-800"
            required
          />
          
          <input
            type="text"
            name="god"
            value={formData.god || ''}
            onChange={handleChange}
            placeholder="God"
            className="w-full p-2 border rounded bg-white text-zinc-800"
          />

          <input
            type="number"
            name="popularity"
            value={formData.popularity || ''}
            onChange={handleChange}
            placeholder="Popularity"
            className="w-full p-2 border rounded bg-white text-zinc-800"
          />

          <textarea
            name="story"
            value={formData.story || ''}
            onChange={handleChange}
            placeholder="Story"
            className="w-full p-2 border rounded bg-white text-zinc-800 h-24"
          />

          <input
            type="text"
            name="temples"
            value={formData.temples || ''}
            onChange={handleChange}
            placeholder="Temples"
            className="w-full p-2 border rounded bg-white text-zinc-800"
          />

          

          <div className="space-y-1">
            <label className="block text-sm text-zinc-600">Image[url]</label>
            <input
            type="text"
            name="descriptions"
            value={formData.descriptions || ''}
            onChange={handleChange}
            placeholder="Image[url]"
            className="w-full p-2 border rounded bg-white text-zinc-800"
          />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-zinc-600">Main Image</label>
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-zinc-800"
              accept="image/*"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-zinc-600">Additional Images</label>
            <input
              type="file"
              name="imgs"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-zinc-800"
              accept="image/*"
              multiple
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update Theyyam'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTheyyam;