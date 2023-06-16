import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {LoadingIcon} from "@/components";
import {userService} from "@/services";

export default () => {
    const [loading, setLoading] = useState(false);
    const [complete, setComplete] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError
    } = useForm({
        criteriaMode: "all"
    });

    const checkEmail = (data: any) => {
        setLoading(true);
        userService.checkEmail(data.email).then(() => {
            setLoading(false);
            setComplete(true);
        }).catch(() => {
            setLoading(false);
            setError('email', {
                type: 'manual',
                message: 'メールアドレスに誤りがあります'
            })
        });
    }

    return (
        <div className="w-full h-screen bg-gradient-to-br from-sky-200 to-teal-500">
            <div className="flex h-screen justify-center items-center">
                <div className="max-w-full px-8 py-8">
                    <p className="text-white font-bold text-5xl mb-4">
                        { complete ? 'パスワードの設定用のリンクをメールでお送りました' : 'メールアドレス(ユーザID)の確認' }
                    </p>
                    { complete ?
                        <p>入力されたメールアドレス宛にパスワード設定用のリンクを送信しました。<br />
                            メールのリンクをクリックして、パスワードの設定を完了してください。</p> :
                        <form onSubmit={handleSubmit(checkEmail)}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                メールアドレス(ユーザID)を入力してください。
                            </label>
                            <input
                                {...register("email", {
                                    required: "メールアドレスは必須入力です。",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'メールアドレスが正しい形式ではありません'
                                    }
                                })}
                                type="text"
                                placeholder="メールアドレス"
                                className={(errors.email ? 'border-red-300' : 'border-gray-300') +
                                ` border mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm rounded-md focus:outline-none`}
                            />
                            {errors.email && <p className="text-red-500 mt-1">{errors.email.message + ''}</p>}

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className={"inline-flex w-40 justify-center px-4 py-2 text-sm font-medium text-blue-900 " +
                                        "bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none " +
                                        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top min-w-"}
                                    disabled={loading}
                                >
                                    {loading ?
                                        <LoadingIcon />
                                        : '確認'
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
