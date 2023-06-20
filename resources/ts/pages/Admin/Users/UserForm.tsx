import React, {useEffect, useState} from "react"
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {Field, User} from "@/helper/type";
import {ConfirmModal, LoadingIcon} from "@/components";
import {Input} from "@/components/Input";
import AdminLayout from "@/pages/Admin/Common/AdminLayout";
import {useDispatch} from "react-redux";
import {commonConstants} from "@/constants";
import swal from '@/helper/swal';
import {getAdminRoute} from "@/helper/utils";
import { userService } from "@/services";
import commonConstant from "@/constants/common";

const UserForm = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams<{ id?: string | undefined }>();
    const [user, setUser] = useState<User>();
    const [errorsMessage, setErrorsMessage] = useState([[]]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        reset,
        setValue,
        getValues,
    } = useForm({
        criteriaMode: "all",
    });

    const onSubmit = async (data: any) => {
        // setLoading(true);
        if (id) {
            const result  : any = await userService.update(data, id);

            if (result.statusCode == commonConstant.STATUS_SUCCESS) {
                swal.messageSuccess('Thành công', 1000)

                // navigate(`/${getAdminRoute()}/users`);
            } else if (result.statusCode == commonConstant.STATUS_VALIDATE) {
                typeof result.errors === 'object' && Object.entries(result.errors).forEach(([key, value]: [any, any]) => {
                    setError(key, {
                        type: 'manual',
                        message: value[0] ?? ''
                    })
                });
            }
        } else {
            const result  : any = await userService.create(data);

            if (result.statusCode == commonConstant.STATUS_SUCCESS) {
                swal.messageSuccess('Thành công', 1000)

                navigate(`/${getAdminRoute()}/users`);
            } else if (result.statusCode == commonConstant.STATUS_VALIDATE) {
                typeof result.errors === 'object' && Object.entries(result.errors).forEach(([key, value]: [any, any]) => {
                    setError(key, {
                        type: 'manual',
                        message: value[0] ?? ''
                    })
                });
            }
        }
    }

    useEffect(() => {
        dispatch({ type: commonConstants.SET_MENU, menu: 'user' });
        if (id) {
            userService.getUser({id: id}).then((res : any) => {
                setUser(res.data);
                reset({
                    id: res.data.id,
                    name: res.data.name,
                    name_kana: res.data.name_kana,
                    email: res.data.email,
                    role: res.data.role,
                });
            }).catch(() => navigate(`/${getAdminRoute()}/users`))
        } else {
            reset({
                role: 'user',
            })
        }
    }, []);

    const processError = (e: { errors: {}[] }) => {
        typeof e.errors === 'object' && Object.entries(e.errors).forEach(([key, value]: [any, any]) => {
            setError(key, {
                type: 'manual',
                message: value[0] ?? ''
            })
        });
    }

    const processDelete = () => {
        // return userService.deleteUser(user!);
    }

    const deleteItem = async () => {
        let result = await swal.confirm({
            title: 'Are you sure you want to delete',
            text: 'texttexttexttexttext',
            buttonConfirm: 'delete'
        })

        if (result) {
            userService.delete({id: id}).then((res : any) => {
                swal.messageSuccess('Thành công', 1000)
                navigate(`/${getAdminRoute()}/users`)
            }).catch(() => swal.messageErr('Lỗi', 1000))
        }
    }

    const fields: Field[] = [
        { name: 'name', defaultValue: '', validateOptions: { required: "ユーザー名は必須入力です。" }, label: 'ユーザー名' },
        {
            name: 'name_kana',
            defaultValue: '',
            validateOptions: {
                pattern: {
                    value: /^[\u30A0-\u30FF]+$/,
                    message: 'ユーザー名 (ヨミガナ)は全角カタカナで入力して下さい。',
                }
            },
            label: 'ユーザー名 (ヨミガナ)'
        },
        { name: 'password', defaultValue: '', validateOptions: {required: user ? false : "パスワードは必須入力です。",}, label: 'パスワード', type: 'password'},
        {
            name: 'email',
            defaultValue: '',
            label: 'メールアドレス',
            validateOptions: {
                required: "メールアドレスは必須入力です。",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'メールアドレスが正しい形式ではありません'
                }
            }
        },
        {
            name: 'role',
            defaultValue: 'user',
            label: '役割',
            type: 'select',
            options: [
                { id: 0, value: '', name: '選択' },
                { id: 1, value: 'user', name: 'ユーザー' },
                { id: 2, value: 'admin', name: 'アドミン' },
            ],
            validateOptions: {
                required: "役割は必須入力です。"
            }
        }
    ]

    return <AdminLayout>
        <div className="py-6 sm:px-6 lg:px-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row mt-4 justify-center">
                    <div className="max-w-lg w-full">
                        <div className="flex flex-col max-w-lg bg-gray-100 rounded">
                            <div className="px-4 py-2 border-b font-bold">
                                ユーザー情報
                            </div>
                            <div className="px-4 pb-4">
                                { fields.map(field => (
                                    <Input register={register} errors={errors} field={field} key={field.name} setValue={setValue} getValues={getValues} />
                                )) }
                            </div>
                        </div>
                    </div>
                    <div className="ml-8 flex flex-col">
                        <button type="submit"
                                className="py-2 w-48 h-10 bg-indigo-500 text-white rounded flex justify-center items-center focus:outline-none"
                                role="button" disabled={loading}>
                            { loading ? <LoadingIcon /> : (user ? '更新' : '登録') }
                        </button>
                        { user &&
                            <button type="button"
                                    className="py-2 w-48 h-10 bg-red-400 text-white rounded flex justify-center items-center focus:outline-none mt-4"
                                    role="button" disabled={deleting} onClick={() => deleteItem()}>
                                削除
                            </button>
                        }
                        <button type="button" className="py-2 w-48 border bg-white rounded mt-4 focus:outline-none" role="button"
                                onClick={() => navigate(-1)}>前のページに戻る</button>
                    </div>
                </div>
            </form>
        </div>
        {/* <ConfirmModal
            open={deleting}
            closeModal={() => setDeleting(false)}
            message={`この項目を削除しますか？`}
            process={processDelete}
            afterLeave={() => navigate(`/${getAdminRoute()}/users`)}
        /> */}
    </AdminLayout>
}

export default UserForm;
