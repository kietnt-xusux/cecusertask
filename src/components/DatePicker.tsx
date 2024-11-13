'use client';
import React, {Fragment, useEffect, useRef, useState} from "react"
import {CalendarIcon, ChevronRightIcon, ChevronLeftIcon, XIcon} from "./Icon";
import {Transition} from "@headlessui/react";

let start = new Date();
start.setHours(0,0,0,0);
let today = start.getTime();

export const DatePicker = (props: {
    date: string | undefined,
    setDate: any,
    className?: string,
    icon?: boolean,
    position?: string,
    startDate?: string,
    endDate?: string,
    minDate?: string,
    maxDate?: string,
    selectsStart?: boolean,
    selectsEnd?: boolean,
    clearIcon?: boolean,
    inputClass?: string,
    clearIconClass?: string,
}) => {
    const MONTH_NAMES = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ];
    const DAYS = ["日", "月", "火", "水", "木", "金", "土"];
    const dayStatus = {
        default: 1,
        selected: 2,
        today: 3,
        hoverSelect: 4,
        notSelect: 5,
        selectedDisable: 6,
        disable: 9,
    }

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [decade, setDecade] = useState<number>(0);
    const [noOfDay, setNoOfDay] = useState<{ day: number, status: number }[]>([]);
    const [blankDays, setBlankDays] = useState<number[]>([]);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [minDate, setMinDate] = useState<any>(null);
    const [maxDate, setMaxDate] = useState<any>(null);
    const [selectsStart, setSelectsStart] = useState(false);
    const [selectsEnd, setSelectsEnd] = useState(false);

    const [startHover, setStartHover] = useState(0);
    const [endHover, setEndHover] = useState(0);

    const [mode, setMode] = useState('month');
    const [months, setMonths] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        let currentMonth: number, currentYear: number, currentDate: number,
            arrayDate = props.date ? props.date.split('/') : [],
            arrayMinDate = props.minDate?.split('/'),
            arrayMaxDate = props.maxDate?.split('/');

        if (arrayDate.length !== 3) {
            currentMonth = new Date().getMonth();
            currentYear = new Date().getFullYear();
        } else {
            currentMonth = parseInt(arrayDate[1]) - 1;
            currentYear = parseInt(arrayDate[0]);
            currentDate = parseInt(arrayDate[2]);
            setSelectedDate(new Date(currentYear, currentMonth, currentDate).getTime())
        }

        if (arrayMinDate && arrayMinDate.length === 3) {
            setMinDate(new Date(parseInt(arrayMinDate[0]), parseInt(arrayMinDate[1]) - 1, parseInt(arrayMinDate[2])).getTime());
        }

        if (arrayMaxDate && arrayMaxDate.length === 3) {
            setMaxDate(new Date(parseInt(arrayMaxDate[0]), parseInt(arrayMaxDate[1]) - 1, parseInt(arrayMaxDate[2])).getTime());
        }

        setMonth(currentMonth);
        setYear(currentYear);
        setSelectedYear(currentYear);
        setDecade(Math.floor(currentYear / 10));
        setSelectsStart(!!props.selectsStart);
        setSelectsEnd(!!props.selectsEnd);
    }, []);

    useEffect(() => {
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        let dayOfWeek = new Date(year, month).getDay();
        let blankDaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankDaysArray.push(i);
        }

        let daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push({ day: i, status: setStatus(i) });
        }

        setBlankDays(blankDaysArray);
        setNoOfDay(daysArray);

        let months = [], years = [];
        for (let i = 1; i <= 12; i++) months.push(i);
        for (let i = 0; i <= 9; i ++) years.push(decade * 10 + i);

        setMonths(months);
        setYears(years);
    }, [month, year, decade, selectedDate, startHover, endHover, startDate, endDate]);

    useEffect(() => {
        let arrayDate = props.date ? props.date.split('/') : [];
        if (arrayDate.length === 3) {
            let currentMonth = parseInt(arrayDate[1]) - 1,
                currentYear = parseInt(arrayDate[0]),
                currentDate = parseInt(arrayDate[2]);
            setSelectedDate(new Date(currentYear, currentMonth, currentDate).getTime());
            setMonth(currentMonth);
            setYear(currentYear);
        }
    }, [props.date]);

    useEffect(() => {
        let arrayStartDate = props.startDate?.split('/'),
            arrayEndDate = props.endDate?.split('/');
        if (arrayStartDate && arrayStartDate.length === 3) {
            setStartDate(new Date(parseInt(arrayStartDate[0]), parseInt(arrayStartDate[1]) - 1, parseInt(arrayStartDate[2])).getTime());
        }
        if (arrayEndDate && arrayEndDate.length === 3) {
            setEndDate(new Date(parseInt(arrayEndDate[0]), parseInt(arrayEndDate[1]) - 1, parseInt(arrayEndDate[2])).getTime());
        }
    }, [props.startDate, props.endDate]);

    const setDateValue = (date: {day: number, status: number}) => {
        let selectDate = new Date(year, month, date.day);
        if (date.status === dayStatus.disable || date.status === dayStatus.selectedDisable) return;

        props.setDate(selectDate.getFullYear() + '/' + (month < 9 ? '0' + (month + 1) : month + 1) + '/' + (date.day < 10 ? '0' + date.day : date.day));
        date.status = dayStatus.selected;
        setSelectedDate(selectDate.getTime());
        setShowDatePicker(false);
        if (selectsStart) {
            setStartDate(selectDate.getTime());
            setStartHover(0);
        }
        if (selectsEnd) {
            setEndDate(selectDate.getTime());
            setEndHover(0);
        }
    }

    const previous = () => {
        switch (mode) {
            case 'year':
                setYear(year - 1);
                break;
            case 'decade':
                setDecade(decade - 1);
                break;
            case 'month':
            default:
                setMonth(month === 0 ? 11 : month - 1);
                setYear(month === 0 ? year - 1 : year);
        }
    }

    const next = () => {
        switch (mode) {
            case 'year':
                setYear(year + 1);
                break;
            case 'decade':
                setDecade(decade + 1);
                break;
            case 'month':
            default:
                setMonth(month === 11 ? 0 : month + 1);
                setYear(month === 11 ? year + 1 : year);
        }
    }

    const getClassDate = (status: number) => {
        let defaultClass = 'cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ',
            otherClass = 'text-gray-700 hover:bg-blue-200',
            todayClass = 'border text-blue-500 border-blue-500 hover:bg-blue-200 hover:text-gray-700',
            disableClass = 'text-center text-sm leading-loose rounded-full text-gray-300 cursor-default',
            selectedClass = 'bg-blue-500 text-white',
            selectedDisableClass = 'text-center text-sm leading-loose rounded-full cursor-default bg-blue-500 text-gray-300',
            hoverSelectClass = 'bg-blue-300 text-white',
            notSelect = 'text-gray-700 bg-blue-200',
            classText: string;
        switch (status) {
            case dayStatus.disable:
                classText = disableClass;
                break;
            case dayStatus.selected:
                classText = defaultClass + selectedClass;
                break;
            case dayStatus.today:
                classText = defaultClass + todayClass;
                break;
            case dayStatus.hoverSelect:
                classText = defaultClass + hoverSelectClass;
                break;
            case dayStatus.notSelect:
                classText = defaultClass + notSelect;
                break;
            case dayStatus.selectedDisable:
                classText = selectedDisableClass;
                break;
            case dayStatus.default:
            default:
                classText = defaultClass + otherClass;
        }

        return classText;
    }

    const setStatus = (date : number) => {
        let d = new Date(year, month, date).getTime();

        if (selectsStart && startHover) {
            if (d >= startHover && d < startDate) return dayStatus.hoverSelect;
            if (d >= startDate && d < startHover && d <= endDate) return dayStatus.notSelect;
        }

        if (selectsEnd && endHover) {
            if (d < startDate && d === selectedDate) return dayStatus.selectedDisable;
            if (d < startDate) return dayStatus.disable;
            if (d <= endHover && d > endDate) return dayStatus.hoverSelect;
            if (d <= endDate && d > endHover && d >= startDate) return dayStatus.notSelect;
        }

        if (selectedDate && selectedDate === d && d < startDate) return dayStatus.selectedDisable;
        if (selectedDate && selectedDate === d) return dayStatus.selected;
        if ((selectsStart || selectsEnd) && d >= startDate && d <= endDate) return dayStatus.selected;

        if (minDate && d < minDate) return dayStatus.disable;
        if (maxDate && d > maxDate) return dayStatus.disable;
        if (selectsEnd && d < startDate) return dayStatus.disable;

        if (today === d) {
            return dayStatus.today;
        }
        return dayStatus.default;
    }

    const setDayStatus = (date: { day: number, status: number }) => {
        selectsStart && setStartHover(new Date(year, month, date.day).getTime());
        selectsEnd && setEndHover(new Date(year, month, date.day).getTime());
    }

    const setDayStatusOut = () => {
        if (selectsStart) setStartHover(0);
        if (selectsEnd) setEndHover(0);
    }

    const setPosition = () => {
        let classText;
        switch (props.position) {
            case "right":
                classText = "right-0";
                break;
            case "top":
                classText = "bottom-11"
                break;
            default:
                classText = "";
        }

        return "bg-white mt-1 rounded-lg shadow p-4 absolute w-72 z-[700] " + classText;
    }

    const clearDate = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setSelectedDate(null);
        props.setDate('');
    }

    const changeMode = () => {
        mode === 'month' && setMode('year');
        mode === 'year' && setMode('decade');
    }

    const getClassMonth = (monthItem: number) => {
        let defaultClass = 'px-2 py-2 text-center rounded cursor-pointer hover:bg-blue-200 hover:text-gray-700 ',
            selectedClass = 'bg-blue-500 text-white',
            todayClass = 'border text-blue-500 border-blue-500 hover:bg-blue-200 hover:text-gray-700',
            currentMonth = new Date().getMonth(),
            currentYear = new Date().getFullYear();
        if (monthItem === month + 1 && year === selectedYear) return defaultClass + selectedClass;
        if (monthItem === currentMonth + 1 && year === currentYear) return defaultClass + todayClass;
        return defaultClass;
    }

    const setMonthValue = (monthItem: number) => {
        setMonth(monthItem - 1);
        setSelectedYear(year);
        setMode('month');
    }

    const setYearValue = (yearItem: number) => {
        setYear(yearItem);
        setMode('year');
    }

    const getClassYear = (yearItem: number) => {
        let defaultClass = 'px-2 py-2 text-center rounded cursor-pointer hover:bg-blue-200 hover:text-gray-700 ',
            selectedClass = 'bg-blue-500 text-white',
            todayClass = 'border text-blue-500 border-blue-500 hover:bg-blue-200 hover:text-gray-700',
            currentYear = new Date().getFullYear();
        if (yearItem === selectedYear) return defaultClass + selectedClass;
        if (yearItem === currentYear) return defaultClass + todayClass;
        return defaultClass;
    }

    return (
        <div className={`relative ` + props.className} ref={wrapperRef}>
            <div className="cursor-pointer border rounded-md bg-white">
                <input type="text" readOnly
                    className={props.inputClass ?? "w-full px-3 py-2 leading-none rounded-md focus:outline-none focus:shadow-outline text-gray-600 font-medium cursor-pointer"}
                    onKeyDown={(e) => { if (e.key === 'Escape') setShowDatePicker(false) }}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    placeholder="YYYY/MM/DD" value={props.date ?? ''} />
                {
                    props.icon &&
                    <div className="absolute top-1 right-0 px-3 py-2">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                }
                {
                    props.date && props.clearIcon && props.date !== '' &&
                    <div className={props.clearIconClass ?? "absolute top-0 right-0 px-3 py-2 h-full border-b border-t border-transparent"} onClick={clearDate}>
                        <XIcon className="w-5 h-5" />
                    </div>
                }
            </div>
            <Transition
                show={showDatePicker}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={setPosition()}>
                    <div className="flex justify-between items-center mb-2">
                        <div className="cursor-pointer" onClick={() => changeMode()}>
                            { mode !== 'decade' && <span className="ml-1 text-lg text-gray-600 font-normal">{ year }年</span> }
                            { mode === 'month' && <span className="text-lg font-bold text-gray-800">{ MONTH_NAMES[month] }</span> }
                        </div>
                        <div>
                            <button type="button"
                                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:outline-none"
                                onClick={previous}>
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            <button type="button"
                                className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:outline-none"
                                onClick={next}>
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    { mode === 'month' &&
                        <>
                            <div className="grid grid-cols-7 mb-3">
                                {
                                    DAYS.map((day, index) =>
                                        <div key={index}>
                                            <div className="text-gray-800 font-medium text-center text-xs">{ day }</div>
                                        </div>)
                                }
                            </div>
                            <div className="grid grid-cols-7" onMouseLeave={() => setDayStatusOut()}>
                                {
                                    blankDays.map((day, index) => <div className="text-center border p-1 border-transparent text-sm" key={index} />)
                                }
                                {
                                    noOfDay.map((date, dateIndex) =>
                                        <div className="px-1 mb-1" key={dateIndex}>
                                            <div className={getClassDate(date.status)} onClick={() => setDateValue(date)} onMouseEnter={() => setDayStatus(date)}>
                                                { date.day }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    }
                    { mode === 'year' &&
                        <div className="grid grid-cols-4">
                            {
                                months.map((monthItem, index) =>
                                    <div className="px-1 py-1 mb-1" key={index}>
                                        <div className={getClassMonth(monthItem)} onClick={() => setMonthValue(monthItem)}>
                                            { monthItem }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                    { mode === 'decade' &&
                        <div className="grid grid-cols-4">
                            {
                                years.map((yearItem, index) =>
                                    <div className="px-1 py-1 mb-1" key={index}>
                                        <div className={getClassYear(yearItem)} onClick={() => setYearValue(yearItem)}>
                                            { yearItem }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </Transition>
        </div>
    );
}
