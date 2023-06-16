import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from '@/store/store'
import { App } from "@/pages/App";
import '../css/app.css';
import i18n from "@/helper/i18n";
import {I18nextProvider} from "react-i18next";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </PersistGate>
    </Provider>
);
