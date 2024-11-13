'use client';
import {ConfirmModal, Input, LoadingIcon} from "@/components";
import {useEffect, useRef, useState} from "react";
import {Field, User} from "@/helper/type";
import {useForm} from "react-hook-form";
import {userService} from "@/services";
import {toast} from "react-toastify";
import {getUserRoles} from "@/helper/util";
import {useRouter} from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {useSystemStore} from "@/stores/system.storage";

const UserForm = () => {
    const system = useSystemStore();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const router = useRouter();

    const pathname = usePathname();
    const id = useRef(null);

    useEffect(() => {
        let regex = /\d*$/,
            result = regex.exec(pathname);
        console.log(result);
        id.current = result ? result[0] : null;

        if (id.current) {
            userService.show({ id: id.current }).then(res => {
                setUser(res.data);
                reset(res.data);
            }).catch(() => {
            });
        } else {
            reset({
                id: id,
                role: 1
            });
        }
    }, []);
    useEffect(() => {
        system.setMenu('user');
    }, []);

    const onSubmit = (data: any) => {
        setLoading(true);
        if (id.current) {
            userService
                .update({ id: id.current, ...data })
                .then(() => {
                    toast.success('更新しました。');
                })
                .catch(processError)
                .then(() => setLoading(false));
        } else {
            userService.create(data).then(() => {
                router.replace('/admin/users')
            }).catch(processError).then(() => setLoading(false));
        }
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset,
        setValue,
        getValues
    } = useForm({
        criteriaMode: 'all'
    });

    const processError = (e: any) => {
        typeof e.errors === 'object' &&
            Object.entries(e.errors).forEach(([key, value]: [any, any]) => {
                setError(key, {
                    type: 'manual',
                    message: value[0] ?? ''
                });
            });
    };

    const basicFields: Field[] = [
        {
            name: 'name',
            defaultValue: '',
            validateOptions: { required: 'ユーザ名は必須入力です。' },
            label: 'ユーザー名'
        },
        {
            name: 'email',
            defaultValue: '',
            label: 'メールアドレス',
            validateOptions: {
                required: 'メールアドレスは必須入力です。',
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'メール欄には有効なメールアドレスを入力してください'
                }
            }
        },
        {
            name: 'password',
            defaultValue: '',
            validateOptions: {
                required: user ? false : 'パスワードは必須入力です',
                pattern: {
                    value: /(?=.*[A-Za-z])(?=.*\d)/,
                    message: 'パスワードには文字、数字を含ませてください。'
                },
                minLength: {
                    value: 6,
                    message: '6文字以上が必須です。'
                },
            },
            label: 'パスワード',
            type: 'password'
        },
        {
            name: 'role',
            defaultValue: 1,
            label: '役割',
            type: 'select',
            options: getUserRoles(),
            validateOptions: {
                required: '役割は必須入力です。'
            }
        }
    ];

    const deleteUser = async () => {
        await userService.delete({ id: id.current }).then(() => {
            router.push('/admin/users');
        });
    };

    return <div className='py-4 px-8'>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <div className='flex md:flex-row flex-col mt-4 gap-6 items-start'>
                <div className='w-full max-w-lg flex md:flex-row flex-col justify-center items-start gap-6'>
                    <div className='w-full flex flex-col bg-gray-100 rounded'>
                        <div className='px-4 py-2 border-b font-bold'>基本情報</div>
                        <div className='px-4 pb-4'>
                            {basicFields.map(field => {
                                if (field.name === 'password')
                                    return (
                                        <React.Fragment key={field.name}>
                                            <label
                                                htmlFor={field.name}
                                                className='block text-sm font-medium text-gray-700 mt-4'>
                                                {field.label}
                                            </label>
                                            <input
                                                {...register(field.name, field.validateOptions)}
                                                placeholder={field.placeholder ?? field.label}
                                                defaultValue={field.defaultValue}
                                                type='password'
                                                autoComplete='new-password'
                                                id="password"
                                                className={
                                                    (errors[field.name]
                                                        ? 'border-red-300'
                                                        : 'border-gray-300') +
                                                    ` col-span-2 border mt-1 px-2 py-2 block w-full max-w-xs` +
                                                    ` shadow-sm sm:text-sm rounded-md focus:outline-none`
                                                }
                                            />{' '}
                                            <div></div>
                                            {errors[field.name] && (
                                                <p className='text-red-500 mt-1 col-span-2'>
                                                    {errors[field.name]?.message + ''}
                                                </p>
                                            )}
                                        </React.Fragment>
                                    );
                                return (
                                    <Input
                                        register={register}
                                        errors={errors}
                                        field={field}
                                        key={field.name}
                                        setValue={setValue}
                                        getValues={getValues}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className='ml-8 flex flex-col'>
                    <button
                        type='submit'
                        className='py-2 w-48 h-10 bg-indigo-500 text-white rounded flex justify-center items-center focus:outline-none'
                        role='button'
                        disabled={loading}>
                        {loading ? <LoadingIcon/> : user ? '更新' : '登録'}
                    </button>
                    { id.current &&
                        <button
                            type='button'
                            className={clsx(
                                'py-2 w-48 h-10 bg-red-400 text-white rounded flex justify-center items-center focus:outline-none mt-4',
                            )}
                            role='button'
                            onClick={() => setShowDeleteConfirm(true)}>
                            削除
                        </button>
                    }
                    <button
                        type='button'
                        className='py-2 w-48 border bg-white rounded mt-4 focus:outline-none'
                        role='button'
                        onClick={() => router.back()}>
                        前のページに戻る
                    </button>
                </div>
            </div>
        </form>

         <ConfirmModal
            open={showDeleteConfirm}
            closeModal={() => setShowDeleteConfirm(false)}
            message={`このユーザーを削除しますか？`}
            process={deleteUser}
        />
    </div>
}

export default UserForm;
