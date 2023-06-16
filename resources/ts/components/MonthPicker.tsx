import React, {Fragment, useEffect, useRef, useState} from "react"
import {CalendarIcon, ChevronRightIcon, ChevronLeftIcon, XIcon} from "./Icon";
import {Transition} from "@headlessui/react";

interface MonthPickerProps {
    month: string,
    setMonth: any,
    className?: string,
    icon?: boolean,
    position?: string,
    clearIcon?: boolean,
}

export const MonthPicker = ({ month, setMonth, className, icon, position, clearIcon}: MonthPickerProps) => {
    const monthStatus = {
        default: 1,
        selected: 2,
        hoverSelect: 4,
    }

    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [year, setYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState<{ month: number, year: number }>();
    const [noOfMonth, setNoOfMonth] = useState<{ month: number, status: number }[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowMonthPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        let currentMonth: number, currentYear: number,
            arrayMonth = month.split('/');

        if (arrayMonth.length !== 2) {
            let today = new Date();
            currentYear = today.getFullYear();
            currentMonth = today.getMonth() + 1;
            setSelectedMonth({ year: currentYear, month: currentMonth });
        } else {
            currentMonth = parseInt(arrayMonth[1]);
            currentYear = parseInt(arrayMonth[0]);
            setSelectedMonth({ year: currentYear, month: currentMonth });
        }
        setYear(currentYear);
    }, []);

    useEffect(() => {
        let arrayMonth = month.split('/');
        if (arrayMonth.length === 2) {
            let currentMonth = parseInt(arrayMonth[1]),
                currentYear = parseInt(arrayMonth[0]);
            setSelectedMonth({ year: currentYear, month: currentMonth });
            setYear(currentYear);
        }
    }, [month]);

    useEffect(() => {
        let monthsArray = [];
        for (let i = 1; i <= 12; i++) {
            monthsArray.push({ month: i, status: setStatus(i) });
        }
        setNoOfMonth(monthsArray);
    }, [year, selectedMonth]);

    const setMonthValue = (month: {month: number, status: number}) => {
        setMonth(year + '/' + (month.month <= 9 ? '0' + month.month : month.month));
        setShowMonthPicker(false);
    }

    const previousYear = () => {
        setYear(year - 1 );
    }

    const nextYear = () => {
        setYear(year + 1);
    }

    const getClassMonth = (status: number) => {
        let defaultClass = 'cursor-pointer text-center px-1 py-1 text-sm rounded-md leading-loose transition ease-in-out duration-100 ',
            otherClass = 'text-gray-700 hover:bg-blue-200',
            selectedClass = 'bg-blue-500 text-white',
            classText: string;
        switch (status) {
            case monthStatus.selected:
                classText = defaultClass + selectedClass;
                break;
            case monthStatus.default:
            default:
                classText = defaultClass + otherClass;
        }

        return classText;
    }

    const setStatus = (month : number) => {
        if (selectedMonth && year !== selectedMonth.year) return monthStatus.default;
        if (selectedMonth && month === selectedMonth.month) return monthStatus.selected;
        return monthStatus.default;
    }

    const clear = () => {
        setMonth('');
    }

    return (
        <div className={`relative ` + className} ref={wrapperRef}>
            <div className="cursor-pointer" onClick={() => setShowMonthPicker(!showMonthPicker)}>
                <input type="text" readOnly
                       className={"w-full pl-4 py-2 leading-none rounded-md border focus:outline-none focus:shadow-outline text-gray-600 font-medium cursor-pointer" +
                       (icon ? " pr-10" : " pr-4") + (clearIcon ? ' mr-10' : ' ')}
                       onKeyDown={(e) => { if (e.key === 'Escape') setShowMonthPicker(false) }}
                       placeholder="YYYY/MM" value={month} />
                { icon &&
                    <div className="absolute top-1 right-0 px-3 py-2">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                }
            </div>
            { clearIcon && month !== '' &&
                <button className="absolute top-1 right-1 px-1 py-1" onClick={clear}>
                    <XIcon className="w-5 h-5" />
                </button>
            }
            <Transition
                show={showMonthPicker}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={"bg-white mt-1 rounded-lg shadow p-4 absolute origin-top-left w-72 z-30" + (position && position === 'right' ? " right-0" : "")}>
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <span className="ml-1 text-lg text-gray-600 font-normal">{ year }年</span>
                        </div>
                        <div>
                            <button type="button"
                                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:outline-none"
                                    onClick={previousYear}>
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            <button type="button"
                                    className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full focus:outline-none"
                                    onClick={nextYear}>
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-4">
                        {
                            noOfMonth.map((month, dateIndex) =>
                                <div className="px-1 mb-1" key={dateIndex}>
                                    <div className={getClassMonth(month.status)} onClick={() => setMonthValue(month)}>
                                        { month.month }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Transition>
        </div>
    );
}
