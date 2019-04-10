import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarGroup, LinePath } from '@vx/shape';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { timeParse, timeFormat } from 'd3-time-format';
import React from 'react';

const black = '#10161A';
const darkgray1 = '#182026';
const blue = '#4580E6';
const purple = '#9179F2';

const data = [
  {'date': '20190403', 'Entrées': 57, 'Sorties': 58},
  {'date': '20190404', 'Entrées': 71, 'Sorties': 55},
  {'date': '20190405', 'Entrées': 63, 'Sorties': 53},
  {'date': '20190406', 'Entrées': 40, 'Sorties': 45},
  {'date': '20190407', 'Entrées': 55, 'Sorties': 47},
  {'date': '20190408', 'Entrées': 63, 'Sorties': 69},
  {'date': '20190409', 'Entrées': 60, 'Sorties': 75},
]
const dataLastYear = [
  {'date': '20180403', 'Entrées': 48, 'Sorties': 45},
  {'date': '20180404', 'Entrées': 43, 'Sorties': 47},
  {'date': '20180405', 'Entrées': 45, 'Sorties': 53},
  {'date': '20180406', 'Entrées': 37, 'Sorties': 52},
  {'date': '20180407', 'Entrées': 59, 'Sorties': 58},
  {'date': '20180408', 'Entrées': 61, 'Sorties': 52},
  {'date': '20180409', 'Entrées': 55, 'Sorties': 54},
]
const keys = ['Entrées', "Sorties"]

const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%a %d %b');
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

let tooltipTimeout;

const TestComponent = withTooltip(
  ({
    w,
    h,
    padding={top: 40},
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  }) => {
    // bounds
    const xMax = w;
    const yMax = h - padding.top - 50;

    x0Scale.rangeRound([0, xMax]);
    x0ScaleLastYear.rangeRound([0, xMax]);
    x1Scale.rangeRound([0, x0Scale.bandwidth()]);
    yScale.range([yMax, 0]);

    return (
      <div style={{position: 'relative'}}>
        <svg width={w} height={h}>
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
                            className='admission-bar'
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
                            onMouseLeave={event => {
                              tooltipTimeout = setTimeout(() => {
                                hideTooltip();
                              }, 300);
                            }}
                            onMouseMove={event => {
                              if (tooltipTimeout) clearTimeout(tooltipTimeout);
                              const top = bar.y;
                              const left = barGroup.x0 + bar.x;

                              showTooltip({
                                tooltipData: {
                                  bar,
                                },
                                tooltipTop: top,
                                tooltipLeft: left
                              });
                            }}
                          />
                        );
                      })}
                    </Group>
                  );
                });
              }}
            </BarGroup>
            <LinePath
              data={dataLastYear}
              x={d => x0ScaleLastYear(d.date) + 0.5 * x1Scale.bandwidth()}
              y={d => yScale(d['Entrées'])}
              opacity={0.7}
              stroke={'#2965CC'}
              strokeWidth={3}
            />
            <LinePath
              data={dataLastYear}
              x={d => x0ScaleLastYear(d.date) + 1.5 * x1Scale.bandwidth()}
              y={d => yScale(d['Sorties'])}
              opacity={0.7}
              stroke={'#7157D9'}
              strokeWidth={3}
            />
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
        {tooltipOpen && (
          <Tooltip
            top={tooltipTop}
            left={tooltipLeft}
            style={{
              minWidth: 60,
              backgroundColor: '#394B59',
              color: 'white'
            }}
          >
            <div style={{ color: tooltipData.color }}>
              <strong>{tooltipData.bar.key}</strong>
            </div>
            <div>{tooltipData.bar.value}</div>
          </Tooltip>
        )}
      </div>
    )
  }
)

export default ({padding={top: 40}}) => {
  return (
    <ParentSize>
      {({width: w, height: h}) => {
        return <TestComponent padding={padding} w={w} h={h}/>
      }}
    </ParentSize>
  );
};
