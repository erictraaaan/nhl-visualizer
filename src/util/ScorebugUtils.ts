import { IScorebug } from "../components/Scorebug/types/Scorebug";
import { getScoresAPIData } from "./APIUtils";
import { IAPIScoreResults } from "./types/APITypes";

export const getScores = ():IScorebug[] => {
    var output: IScorebug[] = [];
    var rawData: IAPIScoreResults;
    //get the raw json from the api call
    getScoresAPIData('2021-12-02')
    .catch( () => {})
    .then( (res) => {
        if(res) rawData = res;
    })




    //parse the json into scorebug objects

    return output;
}

export default {getScores}