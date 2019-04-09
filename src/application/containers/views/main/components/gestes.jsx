import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { GradientPinkBlue } from '@vx/gradient';
import { letterFrequency, browserUsage } from '@vx/mock-data';
import { ParentSize } from '@vx/responsive';

import './style.less'

const white = '#FFFFFF';
const black = '#10161A';

// const colors = ["#2965CC", "#29A634", "#8F398F", "#00B3A4", "#DB2C6F", "#9BBF30", "#96622D", "#7157D9", "#D99E0B", "#D13913"];
const colors = ['#FF6E4A', '#669EFF', '#C274C2', '#62D96B', '#AD99FF', '#2EE6D6', '#D1F26D', '#FFC940', '#C99765', '#FF66A1']

const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));
console.log(letters)
console.log(browserNames)
console.log(browsers)

const data = [
  {'actes': 33, 'cash': 35000, 'name': 'Chirurgie'},
  {'actes': 45, 'cash': 25000, 'name': 'Ophtalmologie'},
  {'actes': 50, 'cash': 30000, 'name': 'ORL'},
]
const actes = d => d.actes;
const cash = d => d.cash;

const usage = d => d.usage;
const frequency = d => d.frequency;

export default ({ margin={top: 40} }) => {
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
            <text>Gestes côtables</text>
            <Group top={centerY - margin.top} left={centerX}>
              <Pie
              data={data}
              pieValue={actes}
              outerRadius={radius - 80}
              innerRadius={radius - 120}
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
                      fontSize={12}
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
              outerRadius={radius - 135}
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
                    fontSize={12}
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
