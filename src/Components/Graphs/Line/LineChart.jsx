import React from "react";
import "./LineChart.css";
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({onClick, from}) => {
    const dateConvertIsoString = (date) => {
        const day = new Date(date);
        var time = day.getTime()
        var timeOffSet = day.getTimezoneOffset()
        var date_formatted = new Date(time - timeOffSet*60*1000).toISOString().substr(0,10).replace('T', ' ');
        return date_formatted;
    }
    const datePlus = (date, no) => {
        const day = new Date(date);
        day.setDate(day.getDate() + no);
        return day;
    }
    const datesBetween = (startDate, endDate) => {
        const date = new Date(startDate.getTime());
        // Exclude start date
        // date.setDate(date.getDate() + 1);
        const dates = [];
        // Exclude end date
        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const addDate = dateConvertIsoString(datePlus(from, 5));
    const fromStart = new Date(from);
    const to = new Date(addDate);

    const start = new Date(fromStart);
    const end =  new Date(to)
    const days = datesBetween(start, end);

    const formatted = days.map((day) => (
        day.toISOString().substr(0,10).replace('T', ' ')
    ))
    const formatted_object = formatted.reduce((accumulator, value, index) => {
        return {...accumulator, ["date"+index]: value}
    }, {});
    const data = [
        {
          "id": "Still In",
          "color": "hsl(245, 70%, 50%)",
          "data": [
            { x: formatted_object.date0, y: "08:00" },
            { x: formatted_object.date1, y: "09:00" },
            { x: formatted_object.date2, y: "10:00" },
            { x: formatted_object.date3, y: "11:00" },
            { x: formatted_object.date4, y: "12:00" },
          ]
        },
        {
          "id": "Checked Out",
          "color": "hsl(234, 70%, 50%)",
          "data": [
            { x: formatted_object.date0, y: "12:00" },
            { x: formatted_object.date1, y: "13:00" },
            { x: formatted_object.date2, y: "14:00" },
            { x: formatted_object.date3, y: "15:00" },
            { x: formatted_object.date4, y: "16:00" },
            { x: formatted_object.date5, y: "17:00" },
          ]
        }
      ]

    return (
        <div className="lineChart">
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 40, left: 50 }}
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
                    // legend: 'Days',
                    legendOffset: 30,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    format: "%Hh",
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'Hours',
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