import axios from "axios";

const apiUrl = "http://localhost:5291/api/DReminder";

export const getReminders = async () => {
    const response = await axios.get(apiUrl);
    return response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const createReminder = async (reminder) => {
    await axios.post(apiUrl, reminder);
};

export const deleteReminder = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
};
