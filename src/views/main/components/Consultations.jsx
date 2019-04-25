import { Colors } from "@blueprintjs/core";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { Group } from "@vx/group";
import { LegendItem, LegendLabel, LegendOrdinal } from "@vx/legend";
import { genDateValue } from "@vx/mock-data";
import { ParentSize } from "@vx/responsive";
import { scaleTime, scaleLinear, scaleOrdinal } from "@vx/scale";
import { LinePath } from "@vx/shape";
import React from "react";
import { extent, max } from "d3-array";
import { timeParse, timeFormat } from "d3-time-format";

const axisColor = Colors.DARK_GRAY1;

const colors = [
  "#669EFF",
  "#C274C2",
  "#62D96B",
  "#AD99FF",
  "#2EE6D6",
  "#D1F26D",
  "#FFC940",
  "#C99765",
  "#FF66A1",
  "#FF6E4A"
];

// const parseDate = timeParse("%a %m %d %Y");
const format = timeFormat("%d %b");
const formatDate = date => format(date);

function genLines(num) {
  return new Array(num).fill(1).map((d, i) => {
    return Array(7)
      .fill(1)
      .map((d, i) => {
        return {
          date: new Date(Date.now() - i * 24 * 3600000),
          value: Math.max(
            (38 + Math.random() * 5) | 0,
            (Math.random() * 80) | 0
          )
        };
      });
  });
}

const series = genLines(3);
const data = series.reduce((rec, d) => {
  return rec.concat(d);
}, []);

const x = d => d.date;
const y = d => d.value;

const keys = ["Médecine Générale", "Pédiatrie", "Radiologie"];

const colorScale = scaleOrdinal({
  domain: keys,
  range: series.map((s, i) => colors[i])
});

export default () => {
  return (
    <ParentSize className="graph-container">
      {({ width: w, height: h }) => {
        // bounds
        const padding = {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40
        };

        const xMax = w - padding.left - padding.right;
        const yMax = h - padding.top - padding.bottom - 10;

        // scales
        const xScale = scaleTime({
          range: [0, xMax],
          domain: extent(data, x)
        });
        const yScale = scaleLinear({
          range: [yMax, 0],
          domain: [0, max(data, y)]
        });

        const xScaleUnique = scaleTime({
          range: [0, xMax],
          domain: extent(series[0], x)
        });

        xScaleUnique.rangeRound([0, xMax]);

        return (
          <div>
            <svg width={w} height={h - padding.top}>
              {xMax > 8 &&
                series.map((d, i) => {
                  return (
                    <Group key={`lines-${i}`} left={padding.left}>
                      <LinePath
                        data={d}
                        x={d => xScale(x(d))}
                        y={d => yScale(y(d))}
                        stroke={colors[i]}
                        strokeWidth={1}
                      />
                    </Group>
                  );
                })}
              <AxisBottom
                top={yMax + padding.bottom / 2}
                left={padding.left}
                tickFormat={formatDate}
                scale={xScale}
                stroke={axisColor}
                tickStroke={axisColor}
                hideAxisLine={true}
                tickLabelProps={(value, index) => ({
                  fill: axisColor,
                  fontSize: 11,
                  textAnchor: "middle"
                })}
                tickValues={Array(7)
                  .fill(1)
                  .map((d, i) => {
                    return new Date(Date.now() - i * 24 * 3600000);
                  })}
              />
              <AxisLeft
                left={padding.left}
                scale={yScale}
                stroke={axisColor}
                tickStroke={axisColor}
                hideAxisLine={true}
                tickLabelProps={(value, index) => ({
                  dy: "0.4em",
                  fill: axisColor,
                  fontSize: 11,
                  textAnchor: "end"
                })}
              />
            </svg>
            <div className="legend">
              <LegendOrdinal
                scale={colorScale}
                labelFormat={label => `${label.toUpperCase()}`}
              >
                {labels => {
                  return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {labels.map((label, i) => {
                        const size = 10;
                        return (
                          <LegendItem
                            key={`legend-quantile-${i}`}
                            margin={"0 5px"}
                            onClick={event => {
                              alert(`clicked: ${JSON.stringify(label)}`);
                            }}
                          >
                            <svg width={size} height={size}>
                              <rect
                                fill={label.value}
                                width={size}
                                height={size}
                              />
                            </svg>
                            <LegendLabel align={"left"} margin={"0 0 0 4px"}>
                              {label.text}
                            </LegendLabel>
                          </LegendItem>
                        );
                      })}
                    </div>
                  );
                }}
              </LegendOrdinal>
            </div>
          </div>
        );
      }}
    </ParentSize>
  );
};
