import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
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

const data = [
  {'date': '20190409', 'Entrées': 60, 'Sorties': 75},
  {'date': '20190408', 'Entrées': 63, 'Sorties': 69},
  {'date': '20190407', 'Entrées': 55, 'Sorties': 47},
  {'date': '20190406', 'Entrées': 40, 'Sorties': 45},
  {'date': '20190405', 'Entrées': 63, 'Sorties': 53},
  {'date': '20190404', 'Entrées': 71, 'Sorties': 55},
  {'date': '20190403', 'Entrées': 57, 'Sorties': 58},
]
const dataLastYear = [
  {'date': '20180409', 'Entrées': 55, 'Sorties': 54},
  {'date': '20180408', 'Entrées': 61, 'Sorties': 52},
  {'date': '20180407', 'Entrées': 59, 'Sorties': 58},
  {'date': '20180406', 'Entrées': 37, 'Sorties': 52},
  {'date': '20180405', 'Entrées': 45, 'Sorties': 53},
  {'date': '20180404', 'Entrées': 43, 'Sorties': 47},
  {'date': '20180403', 'Entrées': 48, 'Sorties': 45},
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

const x0ScaleLastYear = scaleBand({
  domain: dataLastYear.map(x0),
  padding: 0.2
});

const x1Scale = scaleBand({
  domain: keys,
  padding: 0.1
});

const x1ScaleLastYear = scaleBand({
  domain: keys,
  padding: 0.1
});

const yScale = scaleLinear({
  domain: [0, Math.max(...data.concat(dataLastYear).map(d => Math.max(...keys.map(key => d[key]))))]
});

const color = scaleOrdinal({
  domain: keys,
  range: [blue, purple]
});

export default ({padding={top: 40}}) => {
  return (
    <ParentSize>
      {({width: w, height: h}) => {
        // bounds
        const xMax = w;
        const yMax = h - padding.top - 50;

        x0Scale.rangeRound([0, xMax]);
        x0ScaleLastYear.rangeRound([0, xMax]);
        x1Scale.rangeRound([0, x0Scale.bandwidth()]);
        x1ScaleLastYear.rangeRound([0, x0ScaleLastYear.bandwidth()]);
        yScale.range([yMax, 0]);

        return <svg width={w} height={h}>
          <rect x={0} y={0} width={w} height={h} className='svg-dashboard-module'/>
          <text className='title'>Entrées et Sorties</text>
          <Group top={padding.top}>
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
            <BarGroup
              data={dataLastYear}
              keys={keys}
              height={yMax}
              x0={x0}
              x0Scale={x0ScaleLastYear}
              x1Scale={x1ScaleLastYear}
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
                            className='comparison'
                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            fillOpacity={0.5}
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
            <AxisBottom
            top={yMax}
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
          </Group>
        </svg>
      }}
    </ParentSize>
  );
};
