import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { APP_NAME, COMPANY_NAME } from "../../constants";

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>{APP_NAME} | {COMPANY_NAME}</title>
            </Helmet>

            <Link to="/level/1">
                <button>Start Game</button>
            </Link>
        </>
    )
}

export default HomePage;