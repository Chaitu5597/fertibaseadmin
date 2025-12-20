const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getTestimonials = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials`);
        if (!response.ok) {
            throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        return data.map(item => ({ ...item, id: item._id }));
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
};

export const getTestimonial = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch testimonial');
        }
        const data = await response.json();
        return { ...data, id: data._id };
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        throw error;
    }
};

export const createTestimonial = async (testimonialData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });
        if (!response.ok) {
            throw new Error('Failed to create testimonial');
        }
        const data = await response.json();
        return { ...data, id: data._id };
    } catch (error) {
        console.error('Error creating testimonial:', error);
        throw error;
    }
};

export const updateTestimonial = async (id, testimonialData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData),
        });
        if (!response.ok) {
            throw new Error('Failed to update testimonial');
        }
        const data = await response.json();
        return { ...data, id: data._id };
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
};

export const deleteTestimonial = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete testimonial');
        }
        return true;
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
};
