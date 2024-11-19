'use client';
import {useEffect, useState} from "react";
import {useSystemStore} from "@/stores/system.storage";
import {User} from "@/helper/type";
import {userService} from "@/services";
import {DocumentPlusIcon, ListBox, LoadingIcon, Pagination, SearchIcon, TableHead} from "@/components";
import {listPerPage} from "@/helper/util";
import {useRouter} from "next/navigation";
import UserItem from "@/app/admin/users/UserItem";

const AdminUserIndex = () => {
    const system = useSystemStore();
    const router = useRouter();
    const paramsDefault = {
        page: 1,
        perPage: 20,
        sortField: 'created_at',
        sortValue: 'ASC',
        search_text: '',
        showDeleted: false
    };
    const [params, setParams] = useState<any>(paramsDefault);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setLoading(true);
        let data = {
            per_page: params.perPage,
            page: params.page,
            sort_field: params.sortField,
            sort_value: params.sortValue,
            search_text: searchText,
            show_deleted: params.showDeleted ? 1 : 0
        };

        userService.index(data).then(res => {
            setUsers(res.data);
            setPagination({
                last_page: res.meta.last_page,
                current_page: res.meta.current_page
            });
        }).catch(() => {}).then(() => setLoading(false));
    }, [params]);

    useEffect(() => {
        system.setMenu('user');
    }, []);

    const fields = [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'ユーザー名' },
        { name: 'email', title: 'メールアドレス' },
        { name: 'role', title: '役割' },
        { name: 'created_at', title: '登録日時' },
    ];

    const sort = (name: string) => {
        if (params.sortField !== name) {
            setParams({ ...params, sortValue: 'ASC', sortField: name });
        } else {
            params.sortValue === 'ASC'
                ? setParams({ ...params, sortValue: 'DESC', sortField: name })
                : setParams({ ...params, sortField: '', sortValue: 'ASC' });
        }
    };

    const handleSearchValue = () => {
        setParams({
            ...params,
            keyword: searchText,
            page: 1,
        });
    };

    const handleCurrentPage = (page: number) => {
        setParams({ ...params, page: page });
    };

    const handlePerPage = (value: any) => {
        setParams({...params, page: 1, perPage: value});
    };

    const handleShowDeleted = (value: boolean) => {
        setParams({ ...params, page: 1, showDeleted: value });
    }

    const handlePress = (event: React.KeyboardEvent) => {
        if(event.key === 'Enter') {
            setParams({
                ...params,
                keyword: searchText,
                page: 1,
            });
        }
    }

    return (
        <div className='py-4 px-8'>
            <h2 className='text-3xl mb-2'>ユーザー</h2>

            <div className='mt-1 flex'>
                <input
                    type='text'
                    name='searchText'
                    id='searchText'
                    value={searchText}
                    className='border w-96 max-w-lg px-4 py-2 rounded-l-md focus:outline-none'
                    placeholder='ユーザーとメールアドレスと社員番号で検索する'
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown={e => handlePress(e)}
                />
                <span
                    className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50
                    hover:bg-gray-200 text-gray-500 text-sm cursor-pointer'
                    onClick={handleSearchValue}>
                    <SearchIcon/>
                </span>
            </div>

            <div className='flex justify-between min-h-12'>
                <div className="flex gap-4">
                    <div className='w-24 mt-2 flex'>
                        <ListBox options={listPerPage()} value={params.perPage} handleOnChange={handlePerPage}/>
                    </div>
                </div>
                <div className='flex gap-5'>
                    <button
                        className='rounded bg-emerald-400 border border-emerald-400 hover:bg-white hover:text-emerald-400
                        px-4 text-white text-sm flex items-center justify-center'
                        onClick={() => router.replace(`/admin/users/create`)}>
                        <DocumentPlusIcon className='w-5 h-5 mr-1'/>
                        ユーザーを作成
                    </button>
                </div>
            </div>

            <div className='flex flex-col mt-4 -mx-4 sm:mx-0'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                            <TableHead
                                fields={fields}
                                sort={sort}
                                sortField={params.sortField}
                                sortValue={params.sortValue}
                            />
                        </thead>
                        <tbody className='bg-white'>
                        {loading && (
                            <tr>
                                <td className='px-6 py-4 whitespace-nowrap' colSpan={fields.length}>
                                    <div className='py-1 flex justify-center'>
                                        <LoadingIcon className='w-5 h-5 text-indigo-500'/>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {!loading && users && users.map(user =>
                            <UserItem
                                item={user}
                                key={user.id + ''}
                                params={params}
                                setParams={setParams}
                            />)
                        }
                        {!loading && users.length === 0 && (
                            <tr>
                                <td className='px-6 py-4 whitespace-nowrap' colSpan={fields.length}>
                                    <div className='flex-1 space-y-4 py-1 text-center'>
                                        データを見つかりません。
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {pagination.last_page > 1 && (
                    <Pagination
                        page={pagination.current_page}
                        lastPage={pagination.last_page}
                        setPage={handleCurrentPage}
                        path='/admin/users'
                    />
                )}
            </div>
        </div>
    )
}
export default AdminUserIndex;
