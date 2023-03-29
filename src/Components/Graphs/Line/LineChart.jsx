import React from "react";
import "./LineChart.css";
import { data } from "./data"
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({onClick}) => {
    
    return (
        <div className="lineChart">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 100, bottom: 50, left: 80 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    // precision: "day"
                }}
                xFormat="time:%Y-%m-%d"
                // yScale={{
                //     type: 'linear',
                //     min: '7',
                //     max: 'auto',
                //     stacked: true,
                //     reverse: false
                // }}
                yScale={{
                    type: "time",
                    format: "%H:%M",
                    // precision: "hour"
                }}
                yFormat="time:%Hh"
                indexBy="date"
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    format: "%Y-%m-%d",
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    format: "%Hh%M [%d]",
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={["#7fc97f", "#f47560"]}
                enableGridX={false}
                enableGridY={false}
                lineWidth={1}
                pointSize={7}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={3}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                // enableArea={true}
                // areaBaselineValue={108}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                motionConfig="stiff"
                onClick={onClick}
            />
        </div>
    )
}

export default LineChart;