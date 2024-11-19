import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from './Icon';
import { ListBoxOption } from '@/helper/type';
import clsx from 'clsx';

interface ListBoxProps {
    options: ListBoxOption[];
    value: string | number;
    handleOnChange: any;
    disabled?: boolean;
    className?: string;
}

export const ListBox = ({ options, value, handleOnChange, className }: ListBoxProps) => {
    const option: ListBoxOption | undefined = options.find(item => item.value === value);

    return (
        <Listbox value={value} onChange={handleOnChange}>
            <div className={className ?? 'w-full'}>
                <ListboxButton
                    className={clsx(
                        'relative block w-full rounded-lg py-1.5 pr-10 pl-3 text-left text-sm/6 text-gray-900 shadow-sm',
                        'ring-1 ring-inset ring-gray-300 bg-white'
                    )}>
                    {option?.name}
                    <SelectorIcon className='group absolute top-2 right-2 size-5' aria-hidden='true' />
                </ListboxButton>
                <ListboxOptions
                    anchor='bottom'
                    transition
                    className={clsx(
                        'w-[var(--button-width)] rounded-lg ring-1 ring-black ring-opacity-5 p-1 bg-white',
                        '[--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in',
                        'data-[leave]:data-[closed]:opacity-0 origin-top mt-1'
                    )}>
                    {options.map(o => (
                        <ListboxOption
                            key={o.id}
                            value={o.value}
                            className={clsx(
                                'group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none',
                                'data-[focus]:bg-indigo-100 text-gray-900 data-[selected]:text-indigo-600'
                            )}>
                            <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                            <div className='text-sm truncate group-data-[selected]:font-medium'>{o.name}</div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};
