import { IAPIGameDetails } from "./types/APITypes";

export const getShootingPercentage = (data: IAPIGameDetails): {home: number, away: number} => {
    const homePercentage = Math.round(data.homeStats.goals / data.homeStats.shots ) * 100;
    const awayPercentage = Math.round(data.awayStats.goals / data.awayStats.shots ) * 100;
    return {
        home: homePercentage,
        away: awayPercentage
    }
}

export const getSavePercentage = (data: IAPIGameDetails): {home: number, away: number} => {
    // if just one goalie played, use their save percentage for the teams' percentage.
    var homeSavePercent: number = 0;
    var awaySavePercent: number = 0;
    if (data.homeStats.goalies.length == 1){
        homeSavePercent = data.homeStats.goalies[0].savePercentage;
    }
    else {
        //get the average
        var sum = 0;
        data.homeStats.goalies.forEach( (goalie) => {
            sum += goalie.savePercentage;
        })
        homeSavePercent = sum / data.homeStats.goalies.length ;
    }

    if (data.awayStats.goalies.length == 1){
        awaySavePercent = data.awayStats.goalies[0].savePercentage;
    }
    else {
        var sum = 0;
        data.awayStats.goalies.forEach( (goalie) => {
            sum += goalie.savePercentage;
        })
        awaySavePercent = sum / data.awayStats.goalies.length ;
    }

    return {
        home: homeSavePercent, 
        away: awaySavePercent
    }

    // if multiple goalies played, get the avg save percentage.
}

export const getCorsiForPercent = (data: IAPIGameDetails): {home: number, away: number} => {
    const homeCF  = data.homeStats.shots + data.homeStats.missed + data.awayStats.blocks;
    const homeCA = data.awayStats.shots + data.awayStats.missed + data.homeStats.blocks;
    const homeCorsiPercent = ( homeCF / (homeCF + homeCA ) ) * 100;

    return {
        home : homeCorsiPercent , 
        away : (100 - homeCorsiPercent)
    }

}

export const getPDO = (data: IAPIGameDetails): {home: number , away:number } => {
    //PDO = shooting % + save %
    const savePercentage = getSavePercentage(data);
    const shootingPercentage = getShootingPercentage(data);
    return {
        home : savePercentage.home + shootingPercentage.home,
        away : savePercentage.away + shootingPercentage.away
    }
}