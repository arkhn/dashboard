import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { cityTemperature } from '@vx/mock-data';
import { ParentSize } from '@vx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarGroup } from '@vx/shape';
import { timeParse, timeFormat } from 'd3-time-format';
import React from 'react';

import './style.less'

const blue = '#2965CC';
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
console.log(data)
console.log(keys)

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
  width,
  height,
  margin = {
    top: 40
  }
}) => {
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 50;

  x0Scale.rangeRound([0, xMax]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);
  yScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={4} className='dashboard-back'/>
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
        stroke={blue}
        tickStroke={blue}
        hideAxisLine={true}
        tickLabelProps={(value, index) => ({
          fill: blue,
          fontSize: 11,
          textAnchor: 'middle'
        })}
      />
    </svg>
  );
};
