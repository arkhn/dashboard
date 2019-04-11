import { Colors } from "@blueprintjs/core";
import { GradientPinkBlue } from '@vx/gradient';
import { Group } from '@vx/group';
import { letterFrequency, browserUsage } from '@vx/mock-data';
import { ParentSize } from '@vx/responsive';
import { Pie } from '@vx/shape';
import React from 'react';

const white = Colors.WHITE;
const black = Colors.BLACK;

const color1 = Colors.BLUE3;

const colors = ['#669EFF', '#C274C2', '#62D96B', '#AD99FF', '#2EE6D6', '#D1F26D', '#FFC940', '#C99765', '#FF66A1', '#FF6E4A']

const letters = letterFrequency.slice(0, 4);
const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date');
const browsers = browserNames.map(k => ({ label: k, usage: browserUsage[0][k] }));

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

const revenu = d => d.Revenu;

export default () => {
  return (
    <ParentSize>
      {({width: w, height: h}) => {
        const radius = Math.min(w, h) / 2;
        const centerY = h / 2;
        const centerX = w / 2;

        console.log(data)
        const totalRecettes = data.reduce((a, b) => a + b.Revenu, 0)
        console.log(totalRecettes)

        return (
          <svg width={w} height={h}>
            <rect width={w} height={h} className='svg-dashboard-module' />
            <text className='title'>Recettes par Acte</text>

            <Group top={centerY} left={centerX}>
              <Pie
                data={data}
                pieValue={revenu}
                outerRadius={0.7 * radius}
                innerRadius={0.4 * radius}
                cornerRadius={5}
                padAngle={0.015}
              >
              {pie => {
                return pie.arcs.map((arc, i) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const { startAngle, endAngle } = arc;
                  const hasSpaceForLabel = endAngle - startAngle >= 0.1;
                  return (
                    <g key={`browser-${arc.data.name}-${i}`}>
                    <path d={pie.path(arc)} fill={color1} fillOpacity={(pie.arcs.length - i) / pie.arcs.length} />
                    {hasSpaceForLabel && (
                      <text
                        fill={black}
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fontSize={16}
                        textAnchor="middle"
                      >
                        {arc.data.acte}
                      </text>
                    )}
                    </g>
                  );
                });
              }}
              </Pie>
              <text style={{transform: "translate(-15px, 5px)"}}>{Math.round(totalRecettes)}K</text>
            </Group>
          </svg>
        )
      }}
    </ParentSize>
  );
};
