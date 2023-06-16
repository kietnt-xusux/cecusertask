import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {commonConstants} from "@/constants";
import {Link} from "react-router-dom";
import {ListBox, Pagination, TableHead, PlusIcon, LoadingIcon, Search} from "@/components";
import {User} from "@/helper/type";
import UserItem from "@/pages/Admin/Users/UserItem";
// import {userService} from "@/services";
import AdminLayout from "@/pages/Admin/Common/AdminLayout";
import { getAdminRoute } from "@/helper/utils";
import userService from "@/services/modules/userService";

const UserIndex = () => {
    const adminRoute = getAdminRoute();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState(1);
    const [params, setParams] = useState<{
        perPage: number,
        lastPage: number,
        sortField: string,
        sortValue: string,
    }>({perPage: 10, lastPage: 1, sortField: '', sortValue: ''});

    useEffect(() => {
        dispatch({ type: commonConstants.SET_MENU, menu: 'user' });
        console.log(444444442);

        getData()
    },[params.perPage, params.sortField, params.sortValue, page]);

    const getData = async () => {
        setLoading(true);
        let data = {
            per_page: params.perPage,
            last_page: params.lastPage,
            sort_field: params.sortField,
            page: page,
            sort_value: params.sortValue
        }
        const result  : any = await userService.index(data);
        setLoading(false);
        if (result.status == 200) {
            setUsers(result.data.data);
            setPage(result.data.meta.current_page)
            setParams({...params, lastPage: result.data.meta.last_page})
        }
    }

    const listPerPage = [
        { id: 1, value: 10, name: '10' },
        { id: 2, value: 15, name: '15' },
        { id: 3, value: 25, name: '25' },
        { id: 4, value: 50, name: '50' },
        { id: 5, value: 100, name: '100' },
    ];

    const fields = [
        { name: 'name', title: 'ユーザー名' },
        { name: 'email', title: 'メールアドレス' },
        { name: 'role', title: '役割' },
        { name: 'created_at', title: '登録日時' }
    ]

    const sort = (name: string) => {
        if (params.sortField !== name) {
            setParams({...params, sortValue: 'ASC', sortField: name})
        } else {
            params.sortValue === 'ASC'
                ? setParams({...params, sortValue: 'DESC', sortField: name})
                : setParams({...params, sortField: ''});
        }
    }

    const handlePerPage = (value: any) => {
        setPage(1);

        setParams({...params, perPage: value})
    }

    return (
        <AdminLayout>
            <div className="py-6 sm:px-6 lg:px-12">
                <h2 className="text-3xl">ユーザー</h2>

                {/* <Search conditions={conditions} setConditions={setConditions} setPage={setPage}
                        placeholder={`ユーザー名で検索する`}/> */}

                <div className="flex justify-between">
                    <div className="w-24 mt-2 flex">
                        <ListBox options={listPerPage} value={params.perPage} className="w-full" handleOnchange={handlePerPage} />
                    </div>
                    <Link to={`/${adminRoute}/users/create`} className="leading-8 text-blue-500" >
                        <PlusIcon className="inline-block h-5 w-5" />
                        <span className="inline-block align-middle">ユーザーを登録</span>
                    </Link>
                </div>

                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <TableHead fields={fields} sort={sort} sortField={params.sortField} sortValue={params.sortValue} />
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {loading && (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap" colSpan={fields.length}>
                                                    <div className="flex justify-center">
                                                        <LoadingIcon className="w-5 h-5 text-indigo-500" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        { !loading && users && users.map(user => <UserItem user={user} key={user.id.toString()} />)}
                                        { !loading && users.length === 0 && (
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap" colSpan={fields.length}>
                                                    <div className="flex-1 space-y-4 py-1 text-center">
                                                        データを見つかりません。
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                                { params.lastPage > 1 && <Pagination page={page} lastPage={params.lastPage} setPage={setPage} path='/users' />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default UserIndex;
