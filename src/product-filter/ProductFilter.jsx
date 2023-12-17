

import './ProductFilter.scss'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProductFilter({ setFreeTextSearch, setDateRange, dateRange }) {

    
    const [startDate, endDate] = dateRange;

    return <div className="ProductFilter">

        <div className='input-wrapper'>
            <input className='free-text' placeholder='free text search on time stamps and kwh...' type='text' onChange={(e) => { setFreeTextSearch(e.target.value) }} />
        </div>

        <h2>OR</h2>

        <div className="date-time-picker">
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                placeholderText='Start Date - End Date'
                onChange={(update) => {
                    setDateRange(update)
                }}
                isClearable={true}
            />
        </div>

    </div>
}