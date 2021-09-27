import toast, { Toaster } from 'react-hot-toast';

export function pushToast(message: string, type:string) {
  switch (type) {
    case 'success':
      toast.success(message)
    break;
    case 'error':
      toast.error(message)
    break;
    case 'info':
      toast(message, {
        icon: '☕'
      })
    break;
  }
}

export function ToastComponent() {

  return(
    <Toaster
        toastOptions={{
          style: {
            border: '1px solid var(--base-color)',
            color: 'var(--base-color)',
          },
          success: {
            style: {
              border: '1px solid var(--base-color)',
            },
            iconTheme: {
              primary: 'var(--base-color)',
              secondary: 'white',
            }
          },
          error: {
            style: {
              border: '1px solid var(--red)',
              color: 'black'
            },
            iconTheme: {
              primary: 'var(--red)',
              secondary: 'white',
            }
          }
        }}
      />
  )
}