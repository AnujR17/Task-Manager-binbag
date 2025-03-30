import { Toaster } from 'react-hot-toast';

function Notifications() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 3000,
        },
        error: {
          duration: 4000,
        },
      }}
    />
  );
}

export default Notifications;