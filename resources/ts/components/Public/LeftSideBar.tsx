import React, {Fragment} from "react";
import {Dialog, Disclosure, Transition} from "@headlessui/react";
import {ChevronUpIcon, MinusIcon, PlusIcon} from "@/components";
import { useTranslation } from "react-i18next";

export const LeftSideBar = ({open, closeModal}: { open: boolean, closeModal: any,}) => {
    return <Transition appear show={open} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-1000 overflow-y-auto"
            onClose={closeModal}
        >
            <div className="min-h-screen px-4 text-center">
                <Dialog.Overlay className="fixed inset-0 bg-gray-200 opacity-75" />
                <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 -translate-x-8"
                    enterTo="opacity-100 translate-x-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 -translate-x-8"
                >
                    <div className="fixed left-0 bg-white top-0 h-screen w-96 px-7 py-10 overflow-y-auto">
                        <div>
                            <img src="/img/logo_full.svg" alt="" className="ml-2"/>
                        </div>
                        <div className="mt-7">
                            <IndustryOptions />
                            <AlphabetOptions />
                            <GenreOptions />
                            <TypeOptions />
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
}

const IndustryOptions = () => {
    const { t } = useTranslation('common', { useSuspense: false });

    return <Disclosure>
        {({ open }) => (
            <div className="border-b py-3">
                <Disclosure.Button
                    className="flex w-56 items-center justify-between text-lg font-bold">
                    <span> { t('sidebar.industry') } </span>
                    { open ?
                        <MinusIcon className="w-5 h-5 text-orange-600" /> :
                        <PlusIcon className="w-5 h-5 text-orange-600" />
                    }
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 text-left space-y-1">
                    <p>{ t('sidebar.industry_options.beauty_salon') }</p>
                    <p>{ t('sidebar.industry_options.clinic_cairopractic') }</p>
                    <p>{ t('sidebar.industry_options.architect_real_estate') }</p>
                    <p>{ t('sidebar.industry_options.technology') }</p>
                    <p>{ t('sidebar.industry_options.education_school') }</p>
                    <p>{ t('sidebar.industry_options.food_restaurant') }</p>
                    <p>{ t('sidebar.industry_options.therapy') }</p>
                    <p>{ t('sidebar.industry_options.eco_friendly') }</p>
                    <p>{ t('sidebar.industry_options.sports_team') }</p>
                    <p>{ t('sidebar.industry_options.professional_occupation') }</p>
                    <p>{ t('sidebar.industry_options.finance_securities') }</p>
                    <p>{ t('sidebar.industry_options.shop_retailer') }</p>
                    <p>{ t('sidebar.industry_options.others') }</p>
                </Disclosure.Panel>
            </div>
        )}
    </Disclosure>
}

const AlphabetOptions = () => {
    const { t } = useTranslation('common', { useSuspense: false });

    return <Disclosure>
        {({ open }) => (
            <div className="border-b py-3">
                <Disclosure.Button
                    className="flex w-56 items-center justify-between text-lg font-bold">
                    <span> { t('sidebar.alphabet') } </span>
                    { open ?
                        <MinusIcon className="w-5 h-5 text-orange-600" /> :
                        <PlusIcon className="w-5 h-5 text-orange-600" />
                    }
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 text-left grid grid-cols-2">
                    <p>A</p>
                    <p>B</p>
                    <p>C</p>
                    <p>D</p>
                    <p>E</p>
                    <p>F</p>
                    <p>G</p>
                    <p>H</p>
                    <p>I</p>
                    <p>J</p>
                    <p>K</p>
                    <p>L</p>
                    <p>M</p>
                    <p>N</p>
                    <p>O</p>
                    <p>P</p>
                    <p>Q</p>
                    <p>R</p>
                    <p>S</p>
                    <p>T</p>
                    <p>U</p>
                    <p>V</p>
                    <p>X</p>
                    <p>Y</p>
                    <p>Z</p>
                </Disclosure.Panel>
            </div>
        )}
    </Disclosure>
}

const GenreOptions = () => {
    const { t } = useTranslation('common', { useSuspense: false });

    return <Disclosure>
        {({ open }) => (
            <div className="border-b py-3">
                <Disclosure.Button
                    className="flex w-56 items-center justify-between text-lg font-bold">
                    <span> { t('sidebar.genre') } </span>
                    { open ?
                        <MinusIcon className="w-5 h-5 text-orange-600" /> :
                        <PlusIcon className="w-5 h-5 text-orange-600" />
                    }
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 text-left space-y-1">
                    <p>{ t('sidebar.genre_options.monochrome') }</p>
                    <p>{ t('sidebar.genre_options.multicolored') }</p>
                    <p>{ t('sidebar.genre_options.gradation') }</p>
                    <p>{ t('sidebar.genre_options.animals') }</p>
                    <p>{ t('sidebar.genre_options.illustration') }</p>
                </Disclosure.Panel>
            </div>
        )}
    </Disclosure>
}

const TypeOptions = () => {
    const { t } = useTranslation('common', { useSuspense: false });

    return <Disclosure>
        {({ open }) => (
            <div className="border-b py-3">
                <Disclosure.Button
                    className="flex w-56 items-center justify-between text-lg font-bold">
                    <span> { t('sidebar.type') } </span>
                    { open ?
                        <MinusIcon className="w-5 h-5 text-orange-600" /> :
                        <PlusIcon className="w-5 h-5 text-orange-600" />
                    }
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 text-left space-y-1">
                    <p>{ t('sidebar.type_options.pop') }</p>
                    <p>{ t('sidebar.type_options.natural') }</p>
                    <p>{ t('sidebar.type_options.simple') }</p>
                    <p>{ t('sidebar.type_options.modern') }</p>
                    <p>{ t('sidebar.type_options.cool') }</p>
                    <p>{ t('sidebar.type_options.gorgeous') }</p>
                    <p>{ t('sidebar.type_options.cute') }</p>
                    <p>{ t('sidebar.type_options.japanese') }</p>
                    <p>{ t('sidebar.type_options.other') }</p>
                </Disclosure.Panel>
            </div>
        )}
    </Disclosure>
}
