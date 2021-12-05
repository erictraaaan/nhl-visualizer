export interface IAPIScoreResults {
    date: string
    games: IAPIGameScore[]
}

export interface IAPIGameScore {
    gamePk: number
    homeTeamID: number
    homeTeamScore: number
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
    goalies : IGoalie[]
}

export interface IGoalie {
    id: number
    saves: number
    shots: number
}