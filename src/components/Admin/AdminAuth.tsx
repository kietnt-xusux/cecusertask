'use client';
import { useStore } from '@/stores/auth.storage';

export default function isAdminAuth(Component: any) {
    return function isAdminAuth(props: any) {
        const state = useStore(state => state);
        console.log(state);
        // const auth = useAuthenticationStore();
        //
        // useEffect(() => {
        //     if (!auth || !auth.loggedIn || auth.detail.role !== 6) {
        //         //return redirect("/admin/login");
        //     }
        // }, []);

        // if (!user) {
        //     return null;
        // }

        return <Component {...props} />;
    };
}
