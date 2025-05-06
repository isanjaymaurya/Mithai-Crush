interface IScoreBoard {
    score: number;
    stars: number;
}

const ScoreBoard = ({
    score,
    stars
}: IScoreBoard) => {
    return (
        <div className="m-1">
            <div className="grid grid-cols-3 gap-4 items-center text-center bg-blue-300 rounded-2xl h-20 shadow border">
                <div>Score: {score}</div>
                <div>Stars: {stars}</div>
                <div>Mascoat</div>
            </div>
        </div>
    )
}

export default ScoreBoard;