export const LoadingIcon = ({className}: { className?: string }) => {
    return (
        <svg
            className={`animate-spin ${className ??  'size-5'}`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'/>
            <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
        </svg>
    );
};

export const EyeSlashIcon = ({className}: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className ?? 'h-5 w-5'}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
        />
    </svg>
);

export const EyeIcon = ({className}: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className ?? 'h-5 w-5'}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
        />
        <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/>
    </svg>
);

export const CheckIcon = (props: { className?: string }) => {
    let iconClass = props.className ?? 'h-5 w-5';
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className={iconClass} viewBox='0 0 20 20' fill='currentColor'>
            <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export const XIcon = (props: { className?: string; onClick?: () => void }) => {
    let iconClass = props.className ?? 'h-5 w-5';
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={iconClass}
            viewBox='0 0 20 20'
            fill='currentColor'
            onClick={props.onClick}>
            <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export const SelectorIcon = (props: { className?: string }) => {
    let iconClass = props.className ?? 'h-5 w-5';
    return (
        <svg xmlns='http://www.w3.org/2000/svg' className={iconClass} viewBox='0 0 20 20' fill='currentColor'>
            <path
                fillRule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clipRule='evenodd'
            />
        </svg>
    );
};

export const ArrowTopRightOnSquareIcon = ({className}: { className?: string }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={className ?? 'h-5 w-5'}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
        />
    </svg>
);

export const ChevronDownIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
        />
    </svg>
);

export const UserIcon = ({className}: { className?: string }) => (
    <svg className={className ?? 'size-5'} fill='currentColor' viewBox='0 0 24 24'>
        <path
            d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z'/>
    </svg>
);

export const ChipIcon = ({className}: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className ?? "size-6"}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"/>
    </svg>
)


export const SearchIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            clipRule='evenodd'
        />
    </svg>
)

export const DocumentPlusIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className={className ?? 'size-5'}>
        <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
        />
    </svg>
);

export const ChevronUpIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
            clipRule='evenodd'
        />
    </svg>
);

export const ChevronRightIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            clipRule='evenodd'
        />
    </svg>
)

export const ChevronLeftIcon = ({className}: { className?: string }) => (
    <svg xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'} viewBox='0 0 20 20' fill='currentColor'>
        <path
            fillRule='evenodd'
            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
            clipRule='evenodd'
        />
    </svg>
)

export const CalendarIcon = ({className}: { className?: string }) => (
    <svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg' className={className ?? 'size-5'}>
        <g id='calendar_fill'>
            <path
                d='M5.11113 1.27778C5.11113 0.572082 5.68321 0 6.38891 0C7.09461 0 7.66669 0.572082 7.66669 1.27778V2.55556H15.3334V1.27778C15.3334 0.572082 15.9055 0 16.6112 0C17.3169 0 17.8889 0.572082 17.8889 1.27778V2.55556H20.4445C21.8559 2.55556 23.0001 3.69973 23.0001 5.11113V8.94447H0V5.11113C0 3.69973 1.14416 2.55556 2.55556 2.55556H5.11113V1.27778Z'
                fill='#5C5C5C'
            />
            <path
                d='M0 11.5H23.0001V20.4445C23.0001 21.8559 21.8559 23.0001 20.4445 23.0001H2.55556C1.14416 23.0001 0 21.8559 0 20.4445V11.5Z'
                fill='#5C5C5C'
            />
        </g>
    </svg>
)

export const ArrowLongLeftIcon = ({className}: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className ?? 'size-5'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
    </svg>
)

export const ArrowLongRightIcon = ({className}: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className ?? 'size-5'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
    </svg>
)

export const UserCircleSolidIcon = ({className}: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
         className={className ?? 'size-6'}>
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
    </svg>
)
