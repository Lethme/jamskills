import { toast } from 'react-toastify';

export default class ToastService {
    static ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        progressStyle: {
            background: '#1890ff'
        }
    }
    static Error(text, options) {
        return toast.error(text, {...this.ToastOptions, ...options });
    }
    static Warning(text, options) {
        return toast.warning(text, {...this.ToastOptions, ...options });
    }
    static Info(text, options) {
        return toast.info(text, {...this.ToastOptions, ...options });
    }
    static Success(text, options) {
        return toast.success(text, {...this.ToastOptions, ...options });
    }
    static Loading(text, options) {
        return toast.loading(text, {
            ...this.ToastOptions,
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            draggable: false,
        });
    }
    static Remove(id) {
        toast.dismiss(id);
    }
}