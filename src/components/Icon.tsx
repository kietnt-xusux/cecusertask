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
