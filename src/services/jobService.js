const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Get all jobs
export const getJobs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/Careers`);
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Get single job by ID
export const getJob = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Careers/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching job:', error);
        throw error;
    }
};

// Create new job
export const createJob = async (jobData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Careers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to create job');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

// Update existing job
export const updateJob = async (id, jobData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Careers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });
        if (!response.ok) {
            throw new Error('Failed to update job');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};

// Delete job
export const deleteJob = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Careers/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete job');
        }
        return true;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};
