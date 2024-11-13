'use client';
import React, {useEffect, useRef, useState} from "react";

import {Modal, AvatarCropper, ImageWithLoading, LoadingIcon, UserIcon, EyeSlashIcon, EyeIcon} from "@/components"
import {SubmitHandler, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {userService} from "@/services";
import {useRouter} from "next/navigation";
import {useAuthenticationStore, useSystemStore} from "@/stores";

interface InputsPassword {
    newPass: string,
    oldPass: string,
    newPass_confirm: string,
}

const AdminProfile = () => {
    const system = useSystemStore();
    const auth = useAuthenticationStore();

    const router = useRouter();
    const [openChangePass, setOpenChangePass] = useState(false);
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [newPicture, setNewPicture] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const trigger = useRef<HTMLInputElement>(null);
    const [passwordType, setPasswordType] = useState('password')

    const [loadingPassword, setLoadingPassword] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm<InputsPassword>({
        criteriaMode: "all"
    });

    const password = useRef('');
    password.current = watch("newPass", "");

    useEffect(() => {
        system.setMenu('profile');
        setName(auth.detail?.name);
        setPicture(auth.detail?.picture);
    }, [auth.loggedIn]);

    const handleChangePassword = () => {
        setUpdatedPassword(false);
        setOpenChangePass(true);
    }

    const handleInputFile = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setPicture(reader.result as string);
        }
        setFile(file);
        setNewPicture(true);
    }

    const recoveryPicture = () => {
        setNewPicture(false);
        setPicture(auth.detail?.picture ?? '')
    }

    const saveData = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        userService.updateProfile({ name: name, picture: file }).then((res) => {
            auth.update(res.data);
            toast.success('更新が完了しました。')
        }).catch(() => {
            toast.error('更新が失敗しました。');
        }).then(() => setLoading(false));
    }

    const handlePasswordUpdate: SubmitHandler<InputsPassword> = (data) => {
        setLoadingPassword(true);
        userService.updatePassword({ oldPass: data.oldPass, newPass: data.newPass }).then(res => {
            toast.success('更新が完了しました。');
            reset();
            setOpenChangePass(false);
            setPasswordType('password');
        }).catch((error) => {
            toast.error('更新が失敗しました。');
        }).then(() => setLoadingPassword(false));
    }

    const triggerType = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    return <>
        <div className="py-4 px-8">
            <h2 className="text-3xl">マイページ</h2>

            <div className="flex flex-col md:flex-row mt-3">
                <div className="max-w-lg w-full px-1 md:py-0">
                    <div className="flex flex-col max-w-lg bg-gray-100 rounded">
                        <div className="px-4 py-2 border-b font-bold">
                            プロフィール画像
                        </div>
                        <div className="px-4 py-4 mt-1 flex items-center justify-center">
                            { picture ?
                                <div className="w-72">
                                    <ImageWithLoading src={picture} />
                                </div>:
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                    <UserIcon className="size-12 text-gray-400" />
                                </span>
                            }
                            <div className="flex flex-col flex-shrink-0">
                                <label
                                    onClick={() => trigger.current?.click()}
                                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm
                                    leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer">
                                    画像を選択する
                                </label>
                                { newPicture &&
                                    <button
                                        type="button"
                                        onClick={recoveryPicture}
                                        className="ml-5 mt-4 bg-white py-2 px-3 border border-red-500 rounded-md shadow-sm
                                        text-sm leading-4 font-medium text-red-500 hover:bg-gray-50 focus:outline-none"
                                    >
                                        元の画像に戻す
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col max-w-lg mt-8 bg-gray-100 rounded">
                        <div className="px-4 py-2 border-b font-bold">
                            プロフィール画像
                        </div>
                        <div className="px-4 py-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                ユーザー名
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="given-name"
                                defaultValue={auth.detail?.name ?? ''}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none"
                            />

                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                                メールアドレス
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="given-name"
                                value={auth.detail?.email ?? ''}
                                readOnly={true}
                                className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none"
                                disabled={true}
                            />

                            <label className="block text-sm font-medium text-gray-700 mt-3">権限</label>
                            <p className="ml-2 text-gray-400">ユーザー権限</p>

                            <label className="block text-sm font-medium text-gray-700 mt-3">パスワード</label>
                            <button
                                type="button"
                                className="px-4 py-2 border bg-white rounded mt-2 focus:outline-none"
                                onClick={handleChangePassword}
                            >
                                パスワードを変更する
                            </button>
                        </div>
                    </div>
                </div>
                <div className="md:ml-8 ml-0 flex flex-col mt-4 md:mt-0 items-center md:items-start">
                    <button
                        type="button"
                        onClick={saveData}
                        className="py-2 w-48 h-10 bg-blue-400 text-white rounded flex justify-center items-center hover:bg-blue-500
                        focus:outline-none"
                        role="button"
                        disabled={loading}
                    >
                        {loading ? <LoadingIcon /> : '更新'}
                    </button>
                    <button
                        type="button"
                        className="py-2 w-48 border bg-white rounded mt-4 focus:outline-none hover:bg-gray-100"
                        role="button"
                        onClick={() => router.back()}
                    >
                        前のページに戻る
                    </button>
                </div>
            </div>
        </div>
        <Modal open={openChangePass} closeModal={() => setOpenChangePass(false)}>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    パスワードを変更する
                </h3>
                {updatedPassword ?
                    <>
                        <p className="text-green-400 mt-2">パスワードを変更が完了しました。</p>
                        <button
                            type="button"
                            onClick={() => setOpenChangePass(false)}
                            className="inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-gray-900 bg-gray-100
                            border border-transparent rounded-md hover:bg-gray-200 focus:outline-none align-top"
                        >
                            閉まる
                        </button>
                    </> :
                    <form onSubmit={handleSubmit(handlePasswordUpdate)}>
                        <div className="mt-2">
                            <p className="font-normal">「古いパスワード(現在のパスワード)」と「新しいパスワード」を入力してください。</p>

                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-4">
                                古いパスワード
                            </label>
                            <div className="relative max-w-xs">
                                <input
                                    {...register("oldPass", {
                                        required: "入力してください。",
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*\d)/,
                                            message: "パスワードには文字、数字を含ませてください"
                                        }
                                    })}
                                    type={passwordType}
                                    className="mt-1 px-2 py-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                />
                                <span
                                    className="absolute right-1 top-1 cursor-pointer p-1"
                                    onClick={triggerType}
                                >
                                    {passwordType === 'password' ? <EyeSlashIcon/> : <EyeIcon/>}
                                </span>
                            </div>
                            {errors.oldPass && <p className="text-red-500 mt-1">{errors.oldPass.message}</p>}

                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                                新しいパスワード
                            </label>
                            <div className="relative max-w-xs">
                                <input
                                    {...register("newPass", {
                                        required: "入力してください。",
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*\d)/,
                                            message: "パスワードには文字、数字を含ませてください"
                                        }
                                    })}
                                    type={passwordType}
                                    className="mt-1 px-2 py-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                />
                                <span
                                    className="absolute right-1 top-1 cursor-pointer p-1"
                                    onClick={triggerType}
                                >
                                    {passwordType === 'password' ? <EyeSlashIcon/> : <EyeIcon/>}
                                </span>
                            </div>
                            {errors.newPass && <p className="text-red-500 mt-1">{errors.newPass.message}</p>}

                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                                新しいパスワード（確認用）
                            </label>
                            <div className="relative max-w-xs">
                                <input
                                    {...register("newPass_confirm", {
                                        required: "入力してください。",
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*\d)/,
                                            message: "パスワードには文字、数字を含ませてください"
                                        },
                                        validate: value =>
                                            value === password.current || "新しいパスワードと新しいパスワード(確認用)が一致していません"
                                    })}
                                    type={passwordType}
                                    className="mt-1 px-2 py-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                />
                                <span
                                    className="absolute right-1 top-1 cursor-pointer p-1"
                                    onClick={triggerType}
                                >
                                    {passwordType === 'password' ? <EyeSlashIcon/> : <EyeIcon/>}
                                </span>
                            </div>
                            {errors.newPass_confirm && <p className="text-red-500 mt-1">{errors.newPass_confirm.message}</p>}
                        </div>

                        <div className="mt-4">
                            <div className="w-40 inline-flex">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-blue-900
                                    bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none align-top"
                                    disabled={loadingPassword}
                                >
                                    {loadingPassword ? <LoadingIcon /> : 'パスワード変更'}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpenChangePass(false)}
                                className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 bg-gray-100
                                border border-transparent rounded-md hover:bg-gray-200 focus:outline-none align-top"
                            >
                                キャンセル
                            </button>
                        </div>
                    </form>
                }
            </div>
        </Modal>
        <AvatarCropper inputRef={trigger} resultImage={handleInputFile} />
    </>
}
export default AdminProfile;
