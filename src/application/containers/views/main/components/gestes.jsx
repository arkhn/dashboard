import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';
import { ParentSize } from '@vx/responsive';

import './style.less'

const white = '#FFFFFF';
const black = '#10161A';

const colors = ['#669EFF', '#C274C2', '#62D96B', '#AD99FF', '#2EE6D6', '#D1F26D', '#FFC940', '#C99765', '#FF66A1', '#FF6E4A']

const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));

const data = [
  {'actes': 33, 'cash': 35000, 'name': 'Autre chirurgie'},
  {'actes': 45, 'cash': 15000, 'name': 'Ophtalmologie'},
  {'actes': 5, 'cash': 3000, 'name': 'ORL'},
]
const actes = d => d.actes;
const cash = d => d.cash;

const usage = d => d.usage;
const frequency = d => d.frequency;

export default () => {
  const totalCash = data.map(cash).reduce((a,b) => a+b, 0)

  return (
    <ParentSize>
      {({width: w, height: h}) => {
        const radius = Math.min(w, h) / 2;
        const centerY = h / 2;
        const centerX = w / 2;

        return (
          <svg width={w} height={h}>
            <rect width={w} height={h} className='svg-dashboard-module' />
            <text className='title'>Actes tarifés</text>

            <Group top={centerY} left={centerX}>
              <Pie
              data={data}
              pieValue={actes}
              outerRadius={0.8 * radius}
              innerRadius={0.6 * radius}
              cornerRadius={3}
              padAngle={0}
              >
              {pie => {
                return pie.arcs.map((arc, i) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const { startAngle, endAngle } = arc;
                  const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                  return (
                    <g key={`browser-${arc.data.name}-${i}`}>
                    <path d={pie.path(arc)} fill={colors[i]} />
                    {hasSpaceForLabel && (
                      <text
                      fill={black}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={14}
                      textAnchor="middle"
                      >
                      {arc.data.name}
                      </text>
                    )}
                    </g>
                  );
                });
              }}
              </Pie>
              <Pie
              data={data}
              pieValue={cash}
              pieSortValues={(a, b) => -1}
              outerRadius={0.4 * radius}
              >
              {pie => {
                return pie.arcs.map((arc, i) => {
                  const opacity = 1 / (i + 2);
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  return (
                    <g key={`letters-${arc.data.name}-${i}`}>
                    <path d={pie.path(arc)} fill={colors[i]} fillOpacity={0.5} />
                    <text
                    fill={black}
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={16}
                    textAnchor="middle"
                    >
                    {Math.round(100 *arc.data.cash / totalCash)}%
                    </text>
                    </g>
                  );
                });
              }}
              </Pie>
            </Group>
          </svg>
        )
      }}
    </ParentSize>
  );
};
