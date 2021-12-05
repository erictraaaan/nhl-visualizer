import { Team } from "../../../util/types/Team";

export interface IScorebug {
    awayTeam: Team
    homeTeam: Team
    awayTeamScore: number
    homeTeamScore: number
}