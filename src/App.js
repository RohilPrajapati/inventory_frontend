import {router} from "./router";
import {RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

const queryClient = new QueryClient()

function App() {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="bottom-right"
            />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </div>
  );
}

export default App;
