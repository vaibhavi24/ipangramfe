import {React} from "react";
import Fetchemployee from "./Fetchemployees";
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Viewemployee from "./viewemployees";
const Empdashboard = () => {
    const location = useLocation();
    const userData = location.state;
    console.log(userData)
    // Check if userData is available

    if (!userData) {
        return <Navigate to="/login" />  // Redirect to login page if user data is not available
    }

    return (
        <div>
            <div className="m-4 py-8 px-8 max-w-xlg mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face" />
                <div className="text-center space-y-2 sm:text-left">
                    <div className="space-y-0.5">
                        <p className="text-lg text-black font-semibold">
                            Welcome {userData.username}
                        </p>
                        <p className="text-slate-500 font-medium">
                            {userData.role}
                        </p>
                    </div>
                </div>
            </div>
            <h1>Your Collegues</h1>
            <Viewemployee />
            </div>
    );
};

export default Empdashboard;
