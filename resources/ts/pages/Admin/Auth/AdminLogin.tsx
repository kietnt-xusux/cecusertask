import React, {useEffect, useState} from 'react';
import nprogress from "nprogress";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LoadingIcon} from "@/components";
import {LocationState} from "@/helper/type";
import swal from '@/helper/swal';
// import {userService} from "@/services";
import authService from "@/services/modules/authService";
import authSlice from '@/store/modules/authSlice';
import {useDispatch, useSelector} from "react-redux";
import {getAdminRoute} from "@/helper/utils";

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { from } = location.state as LocationState || { from: { pathname: "/" } };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        authService.login({ email, password }).then(result => {
            if (result.statusCode == 200) {
                dispatch(authSlice.actions.loginSuccess(result.data))
                const adminRoute = getAdminRoute();

                navigate(`/${adminRoute}`);
            } else if (result.statusCode == 401) {
                swal.messageErr('メールアドレス、またはパスワードに誤りがあります', 1000)
            }
        });
    };

    useEffect(() => {
        nprogress.done();
    }, [])

    return (
        <>
            <ToastContainer hideProgressBar={true} autoClose={5000} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-teal-500">
                <form
                    className="mt-8 space-y-6"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div className="container flex mx-auto max-w-full">
                        <div className="py-8 px-8 sm:px-12">
                            <h2 className="text-white text-4xl font-bold mb-8">ログイン</h2>
                            <p className="text-white">パスワードをお忘れの場合は、<Link to="/passwordReset" className="text-indigo-500">パスワードリセット</Link> から</p>
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
                                    className={"mt-1 block border ring-1 ring-transparent w-full shadow-sm sm:text-sm border-gray-300 " +
                                    "rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 focus:outline-none"}
                                />
                                { email === '' && check ? <span className="text-red-500 text-xs">メールアドレスは必須入力です</span> : ''}

                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="パスワード"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={"mt-6 block border ring-1 ring-transparent w-full shadow-sm sm:text-sm border-gray-300 " +
                                    "rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 focus:outline-none"}
                                />
                                { password === '' && check ? <span className="text-red-500 text-xs">パスワードは必須入力です</span> : ''}
                            </div>
                            <div className="text-right py-6">
                                <button
                                    type="submit"
                                    className={"w-40 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm " +
                                        "text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none " +
                                        "focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                                >
                                    { loading ? <LoadingIcon /> : 'ログイン'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AdminLogin;
