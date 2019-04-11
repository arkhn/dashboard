import { Colors } from "@blueprintjs/core";
import { AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { BarGroup, LinePath } from '@vx/shape';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { timeParse, timeFormat } from 'd3-time-format';
import React from 'react';

const black = Colors.BLACK;

const color1 = Colors.BLUE2;
const color12 = Colors.BLUE1;
const color2 = Colors.BLUE4;
const color22 = Colors.BLUE3;

const axisColor = Colors.DARK_GRAY1;
const tooltipColor = Colors.DARK_GRAY5;

let data = [
  {'acte': 'Acte 1', 'Occurrences': 10, 'unitary_cost': 2000},
  {'acte': 'Acte 2', 'Occurrences': 5, 'unitary_cost': 400},
  {'acte': 'Acte 3', 'Occurrences': 35, 'unitary_cost': 120},
  {'acte': 'Acte 4', 'Occurrences': 14, 'unitary_cost': 330},
  {'acte': 'Acte 5', 'Occurrences': 1, 'unitary_cost': 8000},
  {'acte': 'Acte 6', 'Occurrences': 2, 'unitary_cost': 1200},
  {'acte': 'Acte 7', 'Occurrences': 4, 'unitary_cost': 80},
  {'acte': 'Acte 8', 'Occurrences': 2, 'unitary_cost': 170},
]

data = data.map((acte) => {
  return {
    ...acte,
    Revenu: acte.Occurrences * acte.unitary_cost / 1000,
  }
})

const keys = ['Occurrences', 'Revenu']

// accessors
const x0 = d => d.acte;

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
  range: [color1, color2]
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
    x1Scale.rangeRound([0, x0Scale.bandwidth()]);
    yScale.range([yMax, 0]);

    return (
      <div style={{position: 'relative'}}>
        <svg width={w} height={h}>
          <rect x={0} y={0} width={w} height={h} className='svg-dashboard-module'/>
          <text className='title'>Actes Tarifés</text>
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
            <AxisBottom
              top={yMax}
              scale={x0Scale}
              stroke={axisColor}
              tickStroke={axisColor}
              hideAxisLine={true}
              tickLabelProps={(value, index) => ({
                fill: axisColor,
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
              backgroundColor: tooltipColor,
              color: 'white'
            }}
          >
            <div style={{ color: tooltipData.color }}>
              <strong>{tooltipData.bar.key}</strong>
            </div>
            <div>{tooltipData.bar.key == "Revenu" ? tooltipData.bar.value * 1000 : tooltipData.bar.value}</div>
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
