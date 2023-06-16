import React, {useEffect, useRef, useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate, Link, useSearchParams} from "react-router-dom";
import {LoadingIcon} from "@/components";
import {userService} from "@/services";

const Confirmation = () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        getValues
    } = useForm({
        criteriaMode: "all"
    });
    const new_password = useRef({});
    new_password.current = watch("password", "");

    useEffect(() => {
        let code = searchParams.get('code');
        if (code) {
            setToken(code);
            userService.checkToken(code).catch(error => {
                navigate('/login')
            });
        }
    }, []);

    const onSubmit = (data: any) => {
        setLoading(true);
        userService.createNewPassword(token, data.new_password)
            .then(() => {
                setLoading(false);
                setComplete(true);
            })
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-sky-200 to-teal-500">
            <div className="flex h-screen justify-center items-center">
                <div className="max-w-full px-8 py-8">
                    <p className="text-white font-bold text-5xl mb-4">新しいパスワード作成してください。</p>
                    {complete ?
                        <>
                            <p>パスワードの設定を完了しました。</p>
                            <Link to="/login" className="inline-flex w-40 justify-center px-4 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top">ログイン</Link>
                        </> :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                新しいパスワード
                            </label>
                            <input
                                {...register("new_password", {
                                    required: "パスワードは必須入力です。",
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*\d)/,
                                        message: "パスワードには文字、数字を含ませてください"
                                    }
                                })}
                                type="password"
                                placeholder="新しいパスワード"
                                className={(errors.new_password ? 'border-red-300' : 'border-gray-300') +
                                ` border mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm rounded-md focus:outline-none`}
                            />
                            {errors.new_password && <p className="text-red-500 mt-1">{errors.new_password.message + ''}</p>}

                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-2">
                                新しいパスワード(確認用)
                            </label>
                            <input
                                {...register("new_password_confirmation", {
                                    required: "パスワード(確認用)は必須入力です。",
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*\d)/,
                                        message: "パスワード(確認用)には文字、数字を含ませてください"
                                    },
                                    validate: value =>
                                        value === getValues('new_password') || "パスワードとパスワード(確認用)が一致していません"
                                })}
                                type="password"
                                placeholder="新しいパスワード(確認用)"
                                className={(errors.new_password_confirmation ? 'border-red-300' : 'border-gray-300') +
                                ` border mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm rounded-md focus:outline-none`}
                            />
                            {errors.new_password_confirmation &&
                            <p className="text-red-500 mt-1">{errors.new_password_confirmation.message + ''}</p>}

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-flex w-40 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"
                                    disabled={loading}
                                >
                                    {loading ?
                                        <LoadingIcon />
                                        : 'パスワード変更'
                                    }
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
