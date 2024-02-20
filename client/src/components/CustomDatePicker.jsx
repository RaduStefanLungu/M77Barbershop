import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({SelectedDate,SetSelectedDate}) {
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (date) => {
        SetSelectedDate(date);
    };
  
    return (
      <DatePicker
        selected={SelectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
    );
}
