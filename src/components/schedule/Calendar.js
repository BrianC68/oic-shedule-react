import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import { setCurrDay, setPrevDay, setNextDay, clearSearchResults } from '../../actions/scheduleActions';
import formatDate from '../../utils/formatDate';


const Calendar = ({ setCurrDay, setPrevDay, setNextDay, updateCurrentItems, clearSearchResults, closeToggle, toggle }) => {
    const [searchDate, setSearchDate] = useState(new Date());

    const goToDate = (date) => {
        clearSearchResults();
        updateCurrentItems(formatDate(date));
        setCurrDay(new Date(date));
        setPrevDay(new Date(date.setDate(date.getDate() - 1)));
        setNextDay(new Date(date.setDate(date.getDate() + 2)));
        setSearchDate(date.setDate(date.getDate() - 1));
    }

    const ButtonInput = forwardRef(({ value, onClick }, ref) => (
        <a href='!#' className='btn btn-dark' onClick={onClick} ref={ref}>{value}</a>
    ));

    return (
        <div>
            Go To Date  <DatePicker
                        selected={searchDate} 
                        onChange={(calDate) => {goToDate(calDate); toggle && closeToggle()}}
                        customInput={<ButtonInput />}
                        minDate={new Date()}
                        popperPlacement='top' />
        </div>
    )
}

Calendar.propTypes = {
    setCurrDay: PropTypes.func.isRequired,
    setPrevDay: PropTypes.func.isRequired,
    setNextDay: PropTypes.func.isRequired,
}

export default connect(null, { setCurrDay, setNextDay, setPrevDay, clearSearchResults })(Calendar)