import React from "react";
import axios from "axios";
import {Bars, Chart, Layer, Ticks} from "rumble-charts";

export default class KeywordsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {series: []}
    }

    componentDidMount() {
        axios.post('/getPopularKeywords').then(response => {
            console.log(response.data)

            this.setState({series: [{
                    data: [
                        {y:response.data[0].freq, color: '#43a9f7', label: response.data[0].name},
                        {y:response.data[1].freq, color: '#91bcff', label: response.data[1].name},
                        {y:response.data[2].freq, color: '#ff822e', label: response.data[2].name}
                    ]
                }]})

        })


        //this.state.question.answersList = []
        //console.log(this.state.questions)
    }

    render() {
        return(
            <div  style={{textAlign:'center', marginTop:"20px", marginBottom:"20px", display:"inline-block", border:"1px solid black"}}>
                <p style={{marginTop:"28px", display:"inline-block", border:"1px solid black"}} className="white-banner">Popular keywords</p>
                <Chart width={500} height={300} series={this.state.series} minY={0}>
                    <Layer width='100%' height='70%' position='bottom center'>
                        <Ticks
                            axis='x'
                            position='top'
                            label={({index, props}) => props.series[0].data[index].label}
                            labelVisible={true}
                            labelStyle={{textAnchor:'middle',alignmentBaseline:'after-edge',fill:'black'}}
                            labelAttributes={{y: -10}}
                        />
                        <Bars  innerPadding='0.02%' />
                    </Layer>
                </Chart>
            </div>
        )
    }

}
