const groupRemindersByDate = (data) => {
    return data.reduce((acc, reminder) => {
        const reminderDate = reminder.date;
        if (!acc[reminderDate]) {
            acc[reminderDate] = [];
        }
        acc[reminderDate].push(reminder);
        return acc;
    }, {});
};

export default groupRemindersByDate;
