'use client';

import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {EyeIcon, EyeSlashIcon, LoadingIcon} from "@/components";
import clsx from "clsx";
import Link from "next/link";
import {userService} from "@/services";
import {useRouter} from "next/navigation";
import {useAuthenticationStore} from "@/stores";
import Cookies from 'js-cookie'

const AdminLoginPage = () => {
    const authentication = useAuthenticationStore(store => store);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const router = useRouter();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setCheck(true);
        if (email === '' || password === '') return;
        setLoading(true);
        userService.login({ email, password}).then(async res => {
            authentication.login({access_token: res.access_token, token_type: res.token_type});
            authentication.update(res.detail);
            Cookies.set('next_session', JSON.stringify(res.detail), {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });
            router.replace('/admin');
        }).catch(error => {
            console.log(error);
            setLoading(false);
            toast.error("メールアドレス、またはパスワードに誤りがあります");
        });
    }

    const triggerType = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    return <>
        <ToastContainer hideProgressBar={true}/>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-blue-700">
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <div className="container flex mx-auto max-w-full">
                    <div className="py-8 px-8 sm:px-12">
                        <h2 className="text-white text-4xl font-bold mb-8">ログイン</h2>
                        <p className="text-white">パスワードをお忘れの場合は、
                            <Link href={"/forgot-password"} className="text-indigo-500">パスワードリセット</Link>から
                        </p>
                        <p className="text-white">パスワードの再設定を行って下さい。</p>
                        <div className="mt-4">
                            <input
                                type="email"
                                name="email"
                                id="email-address"
                                autoComplete="email"
                                placeholder="メールアドレス"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={clsx(
                                    "mt-1 block border ring-1 ring-transparent w-full shadow-sm sm:text-sm border-gray-300",
                                    "rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 focus:outline-none"
                                )}
                            />
                            {email === '' && check ?
                                <span className="text-red-500 text-xs">メールアドレスは必須入力です</span> : ''}

                            <div className="relative">
                                <input
                                    type={passwordType}
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="パスワード"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={clsx(
                                        "mt-6 block border ring-1 ring-transparent w-full shadow-sm sm:text-sm border-gray-300",
                                        "rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 focus:outline-none"
                                    )}
                                />

                                <span
                                    className="absolute right-1 top-1 cursor-pointer p-1"
                                    onClick={triggerType}
                                >
                                    {passwordType === 'password' ? <EyeSlashIcon/> : <EyeIcon/>}
                                </span>
                            </div>
                            {password === '' && check ?
                                <span className="text-red-500 text-xs">パスワードは必須入力です</span> : ''}
                        </div>
                        <div className="text-right py-6">
                            <button
                                type="submit"
                                className={clsx(
                                    "w-40 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm",
                                    "text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700",
                                    "focus:outline-none"
                                )}
                                disabled={loading}
                            >
                                {loading ? <LoadingIcon/> : 'ログイン'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
}
export default AdminLoginPage;
