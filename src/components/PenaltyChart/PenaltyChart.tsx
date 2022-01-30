import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { IAPIGameDetails, IAPIGameScore, IPenaltyPlay } from '../../util/types/APITypes';

interface IPenaltyChartProps {
    data: IAPIGameDetails
    game: IAPIGameScore
}

interface D3PenaltyData {
    x: string
    y: number
    time: Date
}

const MARGIN = {top: 20, right: 30, bottom: 30, left: 60};
const WIDTH =  460 - MARGIN.left - MARGIN.right;
const HEIGHT = 400 - MARGIN.top - MARGIN.bottom;

const PenaltyChart = (props: IPenaltyChartProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect( () => {
        props.data != null && plotChart();
    },[]);

    const prepData = (penaltyData: IPenaltyPlay[], homeID: number, awayID: number): D3PenaltyData[] => {
        var currentCount = 0;
        var output: D3PenaltyData[] = [];
        penaltyData.forEach( (penalty) => {
            penalty.teamID == homeID? currentCount++ : currentCount--;
            var firstDigitAppend = (penalty.period-1)*2;
            var time = (parseInt(penalty.periodTime.slice(0,1)) + firstDigitAppend).toString() + penalty.periodTime.slice(1);
            output.push({
                x: time,
                y: currentCount,
                time: d3.timeParse('%M:%S')(time)!
            })
        })
        return output;
    }

    const plotChart = () => {
         var data = prepData(props.data.penaltyPlays, props.game.homeTeamID, props.game.awayTeamID);

        var svg = d3.select(ref.current)
            .append("svg")
            .attr("width", WIDTH + MARGIN.left + MARGIN.right)
            .attr("height", HEIGHT + MARGIN.top + MARGIN.bottom)
            .append("g")
            .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");

        
        const yMin = Math.abs(d3.min(data, d => d.y)!);
        const yMax = Math.abs(d3.max(data, d => d.y)!);
        const largest = Math.max(yMin, yMax);
        const yMinValue = -largest;
        const yMaxValue = largest;
        const xTimeMinVal = d3.timeParse('%M:%S')('00:00')!
        const xTimeMaxVal = d3.timeParse('%M:%S')('60:00')!

        var xScale = d3.scaleTime()
            .domain([xTimeMinVal, xTimeMaxVal])
            .range([0, WIDTH]);

        var xAxis = d3.axisBottom(xScale)
            //@ts-ignore 
            .tickFormat(d3.timeFormat("%M:%S"));
        
        const yScale = d3
            .scaleLinear()
            .range([HEIGHT, 0])
            .domain([yMinValue!, yMaxValue!]);

        var yAxis = d3.axisLeft(yScale)
            .ticks(2*largest+1);

        const line = d3
            .line()
            // @ts-ignore
            .x(d => xScale(d.time))
            // @ts-ignore
            .y(d => yScale(d.y));

        // Plot the x axis.
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + HEIGHT/2 + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("y", -5)
            .attr("x", 30)
            .attr("transform", "rotate(90)")

        // Plot the y-axis. 
            svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .selectAll("text")

        // create points for all the penalties
        var circles = svg.selectAll("circle")
            .data(data);

        circles.exit().remove(); // in the case where this function is called twice, remove previous circles

        // Plot the points where penalties are drawn
        circles.enter().append("circle") // appends a circle for every row in data
            .style("opacity", 1) // attributes not associated with data
            .style("stroke-width",1)
            .attr('cx', (d) => {return xScale(d.time)})
            .attr('cy', (d) => {return yScale(d.y)})
            .attr('r', 5)

        // Plot a line connecting the penalties
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#f6c3d0')
            .attr('stroke-width', 4)
            .attr('class', 'line')
            // @ts-ignore
            .attr('d', line);

        // Add a title to the graph
        svg.append("text")
        .attr("x", (WIDTH / 2))             
        .attr("y", 0 - (MARGIN.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .attr("transform", "translate(0,35)")  
        .text("Penalty Differential");

        // Add Home team name
        svg.append("text")
            .attr("x", 20)             
            .attr("y", 0 - MARGIN.top/2)
            .attr("text-anchor", "left")  
            .style("font-size", "12px")
            .text(props.game.homeTeamName);

        // Add Away team name
        svg.append("text")
            .attr("x", 20)             
            .attr("y", HEIGHT + MARGIN.bottom)
            .attr("text-anchor", "left")  
            .style("font-size", "12px")
            .text(props.game.awayTeamName);

    }

    return(
        <div className="penalty-chart-div" ref={ref}></div>
    )
}

export default PenaltyChart;