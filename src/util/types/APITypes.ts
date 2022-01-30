export interface IAPIScoreResults {
    date: string
    games: IAPIGameScore[]
}

export interface IAPIGameScore {
    gamePk: number
    homeTeamID: number
    homeTeamScore: number
    homeTeamName: string
    awayTeamName: string
    awayTeamID: number
    awayTeamScore: number
}

export interface IAPIGameDetails {
    gamePK: number
    homeStats: ITeamStats
    awayStats: ITeamStats
    scoringPlays: number[]
    periodPlays: IPeriodPlay[]
    allPlays: IPlay[]
    faceoffPlays: IFaceoffPlay[]
    penaltyPlays: IPenaltyPlay[]
}

export interface IPeriodPlay {
    startIndex: number
    endIndex: number
}

export interface IPlay {
    coordinates: {x :number , y:number}
    eventIDx: number
    players: IPlayer[]
    eventTypeID: string
    teamID: number
}

export interface IPlayer {
    id: number
    fullName: string
    playerType: string
}

export interface ITeamStats{
    startingRinkSide: string
    id: number
    goals: number
    shots: number
    blocks: number
    missed: number
    goalies : IGoalie[]
}

export interface IGoalie {
    id: number
    saves: number
    shots: number
    savePercentage: number
}

export interface IPenaltyPlay {
    teamID: number
    period: number
    periodTime: string
}

export interface IFaceoffPlay {
    teamID: number
    winnerID: number
    winnerName: string
}