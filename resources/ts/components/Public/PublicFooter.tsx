import React, {Fragment, useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

export const PublicFooter = () => {
    const { i18n, t } = useTranslation('common', { useSuspense: false });

    return <div className="pt-14 pb-10 text-neutral-600 text-sm">
        <div className="flex justify-center">
            <Link to={''} className="flex items-center">
                { t('footers.company_profile') }
                <img src="/img/top/link_square.svg" alt="" className="ml-2"/>
            </Link>
            <Link to={''} className="flex items-center ml-3">
                { t('footers.privacy_policy') }
                <img src="/img/top/link_square.svg" alt="" className="ml-2"/>
            </Link>
            <Link to={''} className="flex items-center ml-3">
                { t('footers.cookie_policy') }
                <img src="/img/top/link_square.svg" alt="" className="ml-2"/>
            </Link>
            <Link to={''} className="flex items-center ml-3">
                { t('footers.terms_use') }
                <img src="/img/top/link_square.svg" alt="" className="ml-2"/>
            </Link>
        </div>
        <p className="text-center mt-6">
            { t('footers.pre_copyrighted') }
        </p>
        <p className="text-center">
            { t('footers.copyrighted') }
        </p>
    </div>
}
