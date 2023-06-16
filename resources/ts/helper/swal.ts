import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const sweetalert2 = {
    messageErr (test: string, timer?: number) {
        Toast.fire({
            icon: 'error',
            title: test,
            timer: timer ?? 2000,
            showCloseButton: true
        })
    },
    messageSuccess (test: string, timer?: number) {
        Toast.fire({
            icon: 'success',
            title: test,
            timer: timer ?? 2000,
            showCloseButton: true
        })
    },
    async confirm (params : any) {
        let country : any = await Swal.fire({
            title: params.title,
            text: params.text,
            icon: params.icon ?  params.icon : 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: params.buttonConfirm
        }).then((result) => {

            return new Promise<void>((resolve: any) => {
                if (result.isConfirmed) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })

        return country;
    }
}

export default sweetalert2;
