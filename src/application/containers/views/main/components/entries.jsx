import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { cityTemperature } from '@vx/mock-data';
import { ParentSize } from '@vx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarGroup } from '@vx/shape';
import { timeParse, timeFormat } from 'd3-time-format';
import React from 'react';

import './style.less'

const black = '#10161A';
const darkgray1 = '#182026';
const blue = '#4580E6';
const purple = '#9179F2';

// const data = cityTemperature.slice(0, 8);
// const keys = Object.keys(data[0]).filter(d => d !== 'date');

const data = [
  {'date': '20190409', 'Entrées': 60, 'Sorties': 75},
  {'date': '20190408', 'Entrées': 63, 'Sorties': 69},
  {'date': '20190407', 'Entrées': 55, 'Sorties': 47},
  {'date': '20190406', 'Entrées': 40, 'Sorties': 45},
  {'date': '20190405', 'Entrées': 63, 'Sorties': 53},
  {'date': '20190404', 'Entrées': 71, 'Sorties': 55},
  {'date': '20190403', 'Entrées': 57, 'Sorties': 58},
]
const keys = ['Entrées', "Sorties"]

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const x0 = d => d.date;

// scales
const x0Scale = scaleBand({
  domain: data.map(x0),
  padding: 0.2
});
const x1Scale = scaleBand({
  domain: keys,
  padding: 0.1
});
const yScale = scaleLinear({
  domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => d[key]))))]
});
const color = scaleOrdinal({
  domain: keys,
  range: [blue, purple]
});

export default ({
  margin = {
    top: 40
  }
}) => {
  return (
    <ParentSize>
      {({width: w, height: h}) => {
        // bounds
        const xMax = w;
        console.log(h)
        const yMax = h - margin.top - 50;

        x0Scale.rangeRound([0, xMax]);
        x1Scale.rangeRound([0, x0Scale.bandwidth()]);
        yScale.range([yMax, 0]);

        return <svg width={w} height={h}>
          <rect x={0} y={0} width={w} height={h} className='svg-dashboard-module'/>
          <Group top={margin.top}>
            <text>Entrées / Sorties</text>
            <BarGroup
              data={data}
              keys={keys}
              height={yMax}
              x0={x0}
              x0Scale={x0Scale}
              x1Scale={x1Scale}
              yScale={yScale}
              color={color}
            >
              {(barGroups) => {
                return barGroups.map(barGroup => {
                  return (
                    <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                      {barGroup.bars.map(bar => {
                        return (
                          <rect
                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            rx={4}
                            onClick={event => {
                              const { key, value } = bar;
                              alert(JSON.stringify({ key, value }));
                            }}
                          />
                        );
                      })}
                    </Group>
                  );
                });
              }}
            </BarGroup>
          </Group>
          <AxisBottom
            top={yMax + margin.top}
            tickFormat={formatDate}
            scale={x0Scale}
            stroke={darkgray1}
            tickStroke={darkgray1}
            hideAxisLine={true}
            tickLabelProps={(value, index) => ({
              fill: darkgray1,
              fontSize: 11,
              textAnchor: 'middle'
            })}
          />
        </svg>
      }}
    </ParentSize>
  );
};
