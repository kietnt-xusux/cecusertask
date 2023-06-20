import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ListBox, Pagination, TableHead, PlusIcon, LoadingIcon, Search} from "@/components";
import {ConditionsProps, RootState, User} from "@/helper/type";
import UserItem from "@/pages/Admin/Users/UserItem";
import AdminLayout from "@/pages/Admin/Common/AdminLayout";
import {getAdminRoute, getDefaultConditions, getListPerpage} from "@/helper/utils";
import { systemSlice } from "@/store";
import { userService } from "@/services";

const UserIndex = () => {
    const conditions = useSelector((state: RootState) => state.system.params);
    const getConditions = () => {
        return conditions && conditions.user ? conditions.user : getDefaultConditions();
    }

    const [params, setParams] = useState<ConditionsProps>(getConditions());
    const adminRoute = getAdminRoute();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        dispatch(systemSlice.actions.setMenu('user'));
        getData();
        dispatch(systemSlice.actions.setCondition({ key: 'user', data: params }));
    },[params.perPage, params.sortField, params.sortValue, params.page, params.searchText]);

    const setPage = (page: number) => {
        setParams({...params, page: page});
    }

    const getData = async () => {
        setLoading(true);
        let data = {
            per_page: params.perPage,
            sort_field: params.sortField,
            page: params.page,
            sort_value: params.sortValue,
            search_text: params.searchText
        }
        const result  : any = await userService.index(data);
        setLoading(false);
        if (result.status == 200) {
            setUsers(result.data.data);
            setPage(result.data.meta.current_page)
            setParams({...params, lastPage: result.data.meta.last_page})
        }
    }
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

    const setSearchText = (value: string) => {
        setParams({...params, searchText: value, page: 1})
    }

    return (
        <AdminLayout>
            <div className="py-6 sm:px-6 lg:px-12">
                <h2 className="text-3xl">ユーザー</h2>

                <Search
                    condition={params.searchText}
                    setCondition={setSearchText}
                    placeholder={`ユーザー名で検索する`}
                />

                <div className="flex justify-between">
                    <div className="w-24 mt-2 flex">
                        <ListBox options={getListPerpage()} value={params.perPage} className="w-full" handleOnchange={handlePerPage} />
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

                                { params.lastPage > 1 &&
                                    <Pagination
                                        page={params.page}
                                        lastPage={params.lastPage}
                                        setPage={setPage}
                                        path={`/${getAdminRoute()}/users`}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
export default UserIndex;
