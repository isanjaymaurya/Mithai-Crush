import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useNavigate } from 'react-router'

import GameBoard from "../../components/GameBoard/GameBoard";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import { APP_NAME } from "../../constants";
import SettingsIcon from "../../assets/icons/SettingsIcon";

// interface LevelPageProps {
//     level: string | number
// }

const LevelPage = () => {
    const {navigate} = useNavigate();
    const { levelNo } = useParams();
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);

    useEffect(() => {
        setScore(0);
        setStars(0);
    }, [])

    return (
        <>
            <Helmet>
                <title>Level {levelNo} | {APP_NAME}</title>
            </Helmet>
            <div style={{ background: 'url("../src/assets/images/level-background.jpg")', backgroundSize: 'cover' }}>
                <div className="container mx-auto h-svh">
                    <div className="max-w-sm mx-auto py-2">
                        <ScoreBoard score={score} stars={stars} />
                    </div>
                    <div className="max-w-sm mx-auto bg-red-300">
                        <GameBoard levelNo={levelNo} setScore={setScore} />
                    </div>
                    <div className="max-w-sm mx-auto items-center bg-pink-300 p-2 my-2">
                        <div className="grid grid-flow-col gap-2">
                            <button onClick={() => navigate(-1)}>
                                <SettingsIcon width={16} height={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LevelPage;