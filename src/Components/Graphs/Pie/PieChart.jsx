import React from "react";
import "./PieChart.css";
import { ResponsivePie } from '@nivo/pie';
import { data } from "./PieData";

const PieChart = ({onClick}) => {
    return (
        <div className="pieChart">
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                sortByValue={true}
                innerRadius={0.7}
                padAngle={2}
                cornerRadius={6}
                activeInnerRadiusOffset={2}
                activeOuterRadiusOffset={8}
                colors={['rgb(224, 210, 85)', '#a1d99b', '#c994c7']}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                enableArcLabels={false}
                arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 20,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
                onClick = {onClick}
            />
        </div>
    )
}

export default PieChart;