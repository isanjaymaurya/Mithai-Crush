import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { APP_NAME, COMPANY_NAME } from "../../constants";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>{APP_NAME} | {COMPANY_NAME}</title>
            </Helmet>

            <div className="container flex justify-center items-center h-svh">
                <Link to="/level/1">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Start
                    </button>
                </Link>
            </div>
        </>
    )
}

export default HomePage;