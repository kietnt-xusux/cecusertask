import React, {useEffect, useRef, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import { commonConstants } from "@/constants";
import AdminLayout from "@/pages/Admin/Common/AdminLayout";
import {Modal, AvatarCropper, ImageWithLoading, LoadingIcon, UserIcon, ImageCropper} from "@/components"
import {RootState} from "@/helper/type";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSearchParams, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
// import {userService} from "@/services";

type InputsPassword = {
    newPass: string,
    oldPass: string
};

type InputsFirstPassword = {
    newPass: string,
    newPassConfirm: string,
};

export default () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openChangePass, setOpenChangePass] = useState(false);
    const authentication = useSelector((state :RootState) => state.authentication);
    const [name, setName] = useState(authentication.user ? authentication.user.detail?.name : '');
    const [picture, setPicture] = useState(authentication.user ? authentication.user.detail?.picture : '');
    const [newPicture, setNewPicture] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const trigger = useRef<HTMLInputElement>(null);
    let [searchParams] = useSearchParams();
    let login = searchParams.get('login');

    const [stamp, setStamp] = useState(authentication.user && authentication.user.detail?.stamp ? authentication.user.detail.stamp : '');
    const [newStamp, setNewStamp] = useState(false);
    const [fileStamp, setFileStamp] = useState<File | null>(null);
    const triggerStamp = useRef<HTMLInputElement>(null);

    const [loadingPassword, setLoadingPassword] = useState(false);
    const [loadingFirstPassword, setLoadingFirstPassword] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [openFirstPass, setOpenFirstPass] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset,
    } = useForm<InputsPassword>({
        criteriaMode: "all"
    });

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        setError: setError2,
        reset: reset2,
        watch,
    } = useForm<InputsFirstPassword>({
        criteriaMode: "all"
    });

    const password = useRef({});
    password.current = watch("newPass", "");

    useEffect(() => {
        dispatch({ type: commonConstants.SET_MENU, menu: 'profile' });
        if (login === 'first' && authentication.user!.detail?.first_login === 1) {
            setOpenFirstPass(true);
        }
    }, []);

    const handleChangePassword = () => {
        if (login === 'first' && authentication.user!.detail?.first_login === 1) {
            setOpenFirstPass(true);
        } else {
            setUpdatedPassword(false);
            setOpenChangePass(true);
        }
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

    const handleInputFileStamp = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setStamp(reader.result as string);
        }
        setFileStamp(file);
        setNewStamp(true);
    }

    const recoveryPicture = () => {
        setNewPicture(false);
        setPicture(authentication.user!.detail?.picture)
    }

    const recoveryStamp = () => {
        setNewStamp(false);
        setStamp(authentication.user!.detail?.stamp ? authentication.user!.detail.stamp : '');
    }

    const saveData = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        // userService.updateProfile(name, file, fileStamp).then(() => {
        //     setNewPicture(false);
        //     setNewStamp(false);
        //     toast.success('更新が完了しました。');
        // }).catch(() => {
        //     toast.error('更新が失敗しました。');
        // }).then(() => setLoading(false));
    }

    const handlePasswordUpdate: SubmitHandler<InputsPassword> = (data) => {
        setLoadingPassword(true);
        // userService.updatePassword(data.oldPass, data.newPass ).then(() => {
        //         setUpdatedPassword(true);
        //         reset();
        // }).catch((errors) => {
        //     setError('oldPass', {
        //         type: 'manual',
        //         message: errors.message ?? ''
        //     })
        // }).then(() => setLoadingPassword(false));
    }

    const handlePasswordSetFirst: SubmitHandler<InputsFirstPassword> = (data) => {
        setLoadingFirstPassword(true);
        // userService.updateFirstPassword(data.newPass).then(() => {
        //     setOpenFirstPass(false);
        //     reset2();
        // }).catch((errors) => {
        //     setError2('newPass', {
        //         type: 'manual',
        //         message: errors.message ?? ''
        //     })
        // }).then(() => setLoadingFirstPassword(false));
    }

    return (
        <AdminLayout>
            <div className="py-6 sm:px-6 lg:px-12">
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
                                        <UserIcon className="h-full w-full text-gray-300" />
                                    </span>
                                }
                                <div className="flex flex-col flex-shrink-0">
                                    <label
                                        htmlFor="file-upload"
                                        onClick={() => trigger.current?.click()}
                                        className={"ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm " +
                                            "text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"}
                                    >
                                        画像を選択する
                                    </label>
                                    { newPicture ?
                                        <button
                                            type="button"
                                            onClick={recoveryPicture}
                                            className={"ml-5 mt-4 bg-white py-2 px-3 border border-red-500 rounded-md " +
                                                "shadow-sm text-sm leading-4 font-medium text-red-500 hover:bg-gray-50"}
                                        >
                                            元の画像に戻す
                                        </button> : ''
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
                                    value={name}
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
                                    value={authentication.user ? authentication.user.detail?.email : ''}
                                    readOnly={true}
                                    className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none"
                                    disabled={true}
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-3">権限</label>
                                <p className="ml-2 text-gray-400">ユーザー権限</p>

                                <label className="block text-sm font-medium text-gray-700 mt-3">パスワード</label>
                                <button type="button" className="px-4 py-2 border bg-white rounded mt-2 focus:outline-none" onClick={handleChangePassword}>パスワードを変更する</button>
                            </div>
                        </div>
                    </div>
                    <div className="md:ml-8 ml-0 flex flex-col mt-4 md:mt-0 items-center md:items-start">
                        <button
                            type="button"
                            onClick={saveData}
                            className={"py-2 w-48 h-10 bg-blue-400 text-white rounded flex justify-center items-center " +
                                "hover:bg-blue-500 focus:outline-none"}
                            role="button"
                            disabled={loading}
                        >
                            { loading ?
                                <LoadingIcon />
                                : '更新'
                            }
                        </button>
                        <button type="button" className="py-2 w-48 border bg-white rounded mt-4 focus:outline-none hover:bg-gray-100" role="button"
                                onClick={() => navigate(-1)}>前のページに戻る</button>
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
                                className={"inline-flex justify-center px-4 py-2 mt-2 text-sm font-medium text-gray-900 " +
                                    "bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none " +
                                    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"}
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
                                <input
                                    {...register("oldPass", {
                                        required: "入力してください。",
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*\d)/,
                                            message: "パスワードには文字、数字を含ませてください"
                                        }
                                    })}
                                    type="password"
                                    className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                />
                                {errors.oldPass && <p className="text-red-500 mt-1">{errors.oldPass.message}</p>}

                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                                    新しいパスワード
                                </label>
                                <input
                                    {...register("newPass", {
                                        required: "入力してください。",
                                        pattern: {
                                            value: /(?=.*[a-z])(?=.*\d)/,
                                            message: "パスワードには文字、数字を含ませてください"
                                        }
                                    })}
                                    type="password"
                                    className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                                />
                                {errors.newPass && <p className="text-red-500 mt-1">{errors.newPass.message}</p>}
                            </div>

                            <div className="mt-4">
                                <div className="w-40 inline-flex">
                                    <button
                                        type="submit"
                                        className={"inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-blue-900 " +
                                            "bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none " +
                                            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"}
                                        disabled={loadingPassword}
                                    >
                                        {loadingPassword ?
                                            <LoadingIcon />
                                            : 'パスワード変更'
                                        }
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpenChangePass(false)}
                                    className={"inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 " +
                                        "bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none " +
                                        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"}
                                >
                                    キャンセル
                                </button>
                            </div>
                        </form>
                    }
                </div>
            </Modal>
            <Modal open={openFirstPass} closeModal={() => setOpenFirstPass(false)}>
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        最初ログインには、パスワードを変更する
                    </h3>

                    <form onSubmit={handleSubmit2(handlePasswordSetFirst)}>
                        <div className="mt-2">
                            <p className="font-normal">「新しいパスワード」と「確認新しいパスワード」を入力してください。</p>

                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-4">
                                新しいパスワード
                            </label>
                            <input
                                {...register2("newPass", {
                                    required: "入力してください。",
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*\d)/,
                                        message: "パスワードには文字、数字を含ませてください"
                                    }
                                })}
                                type="password"
                                className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                            />
                            {errors2.newPass && <p className="text-red-500 mt-1">{errors2.newPass.message}</p>}

                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                                新しいパスワード(確認用)
                            </label>
                            <input
                                {...register2("newPassConfirm", {
                                    required: "入力してください。",
                                    pattern: {
                                        value: /(?=.*[a-z])(?=.*\d)/,
                                        message: "パスワードには文字、数字を含ませてください"
                                    },
                                    validate: value =>
                                        value === password.current || "新しいパスワードと新しいパスワード(確認用)が一致していません"
                                })}
                                type="password"
                                className="mt-1 px-2 py-2 block w-full max-w-xs shadow-sm sm:text-sm border border-gray-300 rounded-md focus:outline-none"
                            />
                            {errors2.newPassConfirm && <p className="text-red-500 mt-1">{errors2.newPassConfirm.message}</p>}
                        </div>

                        <div className="mt-4">
                            <div className="w-40 inline-flex">
                                <button
                                    type="submit"
                                    className={"inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-blue-900 " +
                                        "bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none " +
                                        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"}
                                    disabled={loadingFirstPassword}
                                >
                                    {loadingFirstPassword ?
                                        <LoadingIcon />
                                        : 'パスワード変更'
                                    }
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpenFirstPass(false)}
                                className={"inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-900 " +
                                    "bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none " +
                                    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 align-top"}
                            >
                                キャンセル
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <AvatarCropper inputRef={trigger} resultImage={handleInputFile} />
            <ImageCropper inputRef={triggerStamp} resultImage={handleInputFileStamp} />
        </AdminLayout>
    )
}
