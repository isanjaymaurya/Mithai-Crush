import { Link, useParams } from "react-router-dom"
import { useState } from "react";
import {Helmet} from "react-helmet";

import GameBoard from "../../components/GameBoard/GameBoard";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import { APP_NAME } from "../../constants";

interface LevelPageProps {
    level: string | number
}

const LevelPage = () => {
    const { levelNo } = useParams();
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);

    return (
        <>
            <Helmet>
                <title>Level {levelNo} | {APP_NAME}</title>
            </Helmet>
            <div style={{ background: 'url("../src/assets/images/level-background.jpg")', backgroundSize: 'cover' }}>
                <div className="container mx-auto  h-svh">
                    <div className="max-w-sm mx-auto py-2">
                        <ScoreBoard score={score} stars={stars} />
                    </div>
                    <div className="max-w-sm mx-auto bg-red-300">
                        <GameBoard levelNo={levelNo} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LevelPage;