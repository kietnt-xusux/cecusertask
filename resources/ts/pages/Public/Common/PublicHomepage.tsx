import React from "react";
import {EnvelopeIcon, PublicFooter, PublicHeader} from "@/components";
import { useTranslation } from "react-i18next";
import ButtonScrollTop from "@/components/ButtonScrollTop";

const PublicHomepage = () => {
    const { t } = useTranslation('common', { useSuspense: false });
    const getLogos = () => {
        let logos: number[] = [];
        for (let i = 1; i <= 24; i++) {
            logos.push(i);
        }
        return logos;
    }

    return <>
        <PublicHeader />
        <div className="flex justify-center">
            <img src="/img/top/bg_top.png" alt="" />
        </div>

        <div className="pt-9 pb-12 text-center">
            <p className="mb-2">{ t('home.intro_1') }</p>
            <p className="text-orange-600 text-xl mb-2">{ t('home.intro_2') }</p>
            <p className="mb-2">{ t('home.intro_3') }</p>
            <p className="font-bold text-neutral-500">{ t('home.intro_4') }</p>
        </div>

        <div className="grid grid-cols-4 max-w-[980px] mx-auto gap-8">
            { getLogos().map(i => (
                <div key={i} className="border h-52 w-52">

                </div>
            )) }
        </div>

        <div className="flex justify-center mt-14 mb-16">
            <button
                className="w-52 h-10 flex justify-center items-center text-white rounded bg-orange-600 text-lg"
            >
                { t('home.next') }
            </button>
        </div>

        <div className="py-10 bg-red-500/25 flex justify-center">
            <div className="flex items-center">
                <p>{ t('home.pls_contact_us_question') }</p>
                <button
                    className="flex focus:outline-none w-40 h-11 bg-white justify-center items-center shadow rounded ml-6"
                >
                    <EnvelopeIcon className="w-5 h-5 text-orange-600" />
                    <p className="ml-2">{ t('home.contact_us') }</p>
                </button>
            </div>
        </div>
        <ButtonScrollTop />
        <PublicFooter />
    </>
}
export default PublicHomepage;
