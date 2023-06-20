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
        <p className="text-center">Public Homepage</p>
        <ButtonScrollTop />
        <PublicFooter />
    </>
}
export default PublicHomepage;
