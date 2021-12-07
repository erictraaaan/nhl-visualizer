import * as d3 from 'd3';
import React from 'react';
import { useEffect, useRef } from 'react';
import { IAPIGameDetails } from '../../util/types/APITypes';

interface IShotVisualizerProps {
    data: IAPIGameDetails
}

const ShotVisualizer = (props: IShotVisualizerProps) => {
    const ref = useRef<HTMLDivElement>(null);
	const VALID_SHOTS = ['SHOT', 'GOAL'];
	const HOME_COLOUR = 'red';
	const AWAY_COLOUR = 'blue';
	//double the width and length of a regular hockey rink
	const RINK_WIDTH = 400
	const RINK_HEIGHT = 168

    useEffect( () => {
        console.log("initial load");
        clearOldDrawing();
        console.log("props: " , props);
        props.data != null && drawRink();
    }, []);

    useEffect( () => {
        console.log("prop changed");
        clearOldDrawing();
        console.log("props: " , props);
        props.data != null && drawRink();
    }, [props])

	const clearOldDrawing = () => {
		d3.select("svg").remove();
	}

    const drawRink = () => {

		//define the initial SVG element
        let svg = d3.select(ref.current)
            .append('svg')
            .attr('width', RINK_WIDTH + 10)
            .attr('height', RINK_HEIGHT + 10);

		//draw the centre ice line
		drawVerticalLine(svg, 198,0,RINK_HEIGHT,'red');

		//draw centre ice circle
		drawCircle(svg,200,84,30,'red');

		//draw the goals
		drawRectangle(svg,22.6,80,8,12,'blue');
		drawRectangle(svg,371,80,8,12,'blue');

		//draw the goal lines
		drawVerticalLine(svg,22,6,RINK_HEIGHT-12,'red');
		drawVerticalLine(svg,378,6,RINK_HEIGHT-12,'red');

		//draw the blue lines
		drawVerticalLine(svg,144,0,RINK_HEIGHT,'blue');
		drawVerticalLine(svg,252,0,RINK_HEIGHT,'blue');

		//draw the rink outline
		drawBaseRink(svg, RINK_HEIGHT, RINK_WIDTH);

		//plot all goals as points
        plotGoals(svg);

		//create a heatmap for the shots
        plotShotHeatMap(svg);
    }

    const plotGoals = (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
        props.data.scoringPlays.forEach( (goal) => {
            const scoringPlay = props.data.allPlays.find ( play => play.eventIDx === goal);
            if (scoringPlay != null && svg != null) {
                const colour = scoringPlay.teamID === props.data.homeStats.id ? HOME_COLOUR : AWAY_COLOUR;
                const coord = rebaseCoordinate(scoringPlay.coordinates);
				drawCircle(svg,coord.x,coord.y,2,colour, colour);
            }
        })
    }

	const generateHeatArray = (startCol: number, endCol: number , startRow: number, endRow: number): number[][] => {
		var output:number[][] = [];
        for (let i = startCol ; i < endCol; i++) {
            for (let j = startRow ; j < endRow; j++) {
                output.push([i*8, j*8, 0]);
            }
        }
		return output;
	}

	const addToHeatArray = (array: number[][], coords: {x: number, y: number}) => {
		for (let i = 0 ; i < array.length ; i++) {
			if (coords.x >= array[i][0] && coords.x < (array[i][0]+8)){
				if (coords.y >= array[i][1] && coords.y < (array[i][1]+8)){
					array[i][2]++;
				}
			}
		}
	}

	const generateColourScale = (colour: string) => {
		return d3.scaleLinear<string>()
			.domain([0,4])
			.range(['transparent', colour]);
	}

    const plotShotHeatMap = (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>) => {
		var heatArrayAway = generateHeatArray(0, 25, 0, 21);
		var heatArrayHome = generateHeatArray(25, 50, 0, 21);
        props.data.allPlays.forEach( (play) => {
            if (VALID_SHOTS.includes(play.eventTypeID)) {
                const coords = rebaseCoordinate(play.coordinates);
				addToHeatArray(
					play.teamID === props.data.homeStats.id ? heatArrayHome : heatArrayAway,
					coords);
            }
        });


        let colorScaleHome = generateColourScale(HOME_COLOUR);
        let colorScaleAway = generateColourScale(AWAY_COLOUR);

		//add a second layer to draw away shot map
		var awayLayer = svg.append('g');

		drawHeatMap(svg, heatArrayHome,colorScaleHome);
		drawHeatMap(awayLayer, heatArrayAway,colorScaleAway);
    }

	const drawHeatMap = (svg:any, heatArray: number[][], colourScale: any) => {
		svg.selectAll('rect')
            .data(heatArray)
            .enter()
            .append('rect')
            .attr('rx', 6)
            .attr('ry', 6)
            .attr('x', (d: any) => d[0])
            .attr('y', (d: any)=> d[1] )
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', (d: any) => colourScale(d[2]))
            .attr('opacity', .8)
	}

    const rebaseCoordinate = (coord: {x: number , y: number}): {x: number , y: number} => {
        //consider the starting rink side
        const homeSide = props.data.homeStats.startingRinkSide;
		coord.x = 2*coord.x;
		coord.y = 2*coord.y;
        if (homeSide === "right"){
            coord.x = - coord.x;
            coord.y = - coord.y;
        }
        return {
            x: coord.x + 200,
            y: coord.y + 84
        }
    }

    const drawBaseRink = (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>, height: number, width: number) => {
		svg.append("rect")
			.attr('rx', 45)
			.attr('ry', 45)
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", height)
			.attr("width", width)
			.style('opacity', 1)
			.style("stroke", 'black')
			.style("fill", "none")
			.style("stroke-width", 'black');
    }

    const drawVerticalLine = (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>,
        x: number, y: number, length: number, colour: string) => {
		svg.append('rect')
			.attr('x', x)
			.attr('y', y)
			.attr('height', length)
			.attr('width', '2')
			.style('fill', colour)
    }

    const drawRectangle = (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>,
        x: number, y: number, width: number , height: number, colour: string) => {
        svg.append('rect')
        .attr('x', x)
        .attr('y', y)
        .attr('width', width)
        .attr('height', height)
        .attr('stroke', colour)
        .style("stroke-width", 0.5)
        .attr('fill', '#89CFF0');
    }

    const drawCircle =  (svg:d3.Selection<SVGSVGElement, unknown, null, undefined>,
        x: number, y: number, radius: number, colour: string, fill?: string) => {
            svg.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .style("stroke-width", 0.5)
            .attr('r', radius)
            .attr('stroke', colour)
            .attr('fill', fill ? fill : 'transparent');
        }

    return (
        <div className="shot-visualizer-div" ref={ref}/>
    )
}

export default ShotVisualizer