import React, { Component } from 'react';
import 'App.css';
import SeamaSummaryPanel1 from "./WaterQuality/SeamaSummaryPanel1";
import SeamaWaterProductionChart from "./WaterQuality/SeamaWaterProductionChart";
import SeamaWaterChlorineChart from "./WaterQuality/SeamaWaterChlorineChart";
import SeamaWaterTdsChart from "./WaterQuality/SeamaWaterTdsChart";
import 'css/SeamaWaterOperations.css';
import SeamaWaterQualityNavigation from "./WaterQuality/SeamaWaterQualityNavigation";
import SeamaServiceError from "./SeamaServiceError";
import SeamaDatabaseError from "./SeamaDatabaseError";

class SeamaWaterQuality extends Component {

    render() {
        return this.showContent();
    }
    showContent(props){
        if( this.props.seamaState.hasOwnProperty("healthCheck")){
            if( this.props.seamaState.healthCheck.server !== "Ok" ){
                return SeamaServiceError(props);
            }else  if( this.props.seamaState.healthCheck.database !== "Ok" ){
                return SeamaDatabaseError(props)
            }
        }
        return this.showWaterQuality();

    }

    showWaterQuality( ){
        return (
            <div className="WaterQualityContainer">
                <div className = "WaterQualitySummaryContainer">
                    <div className ="WaterQualitySummaryItem">
                        <SeamaSummaryPanel1 title="Total Production" units={"Gallons"} value={this.props.seamaState.seamaWaterQuality["totalProduction"]}/>
                    </div>
                    <div className ="WaterQualitySummaryItem">
                        <SeamaSummaryPanel1 title="Site Pressure" units={"PSI"} value={this.props.seamaState.seamaWaterQuality["sitePressure"]}/>
                    </div>
                    <div className ="WaterQualitySummaryItem">
                        <SeamaSummaryPanel1 title="Flow Rate" units={"GPM"} value={this.props.seamaState.seamaWaterQuality["flowRate"]}/>
                    </div>
                </div>
                <div className ="WaterQualityNavigtionItem">
                    <SeamaWaterQualityNavigation/>
                </div>
                <div className = "WaterQualityFooFixer">
                    <div className = "WaterQualityChartContainer">
                            <div className= "WaterQualityMainChartItem">
                                 <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                <p>WaterQualityMainChartItem</p>
                                {/*<SeamaWaterProductionChart chartData={this.props.seamaState.seamaWaterQuality["production"]}/>*/}
                            </div>
                            <div className= "WaterQualitySecondaryChart1Item">
                                {/*<SeamaWaterChlorineChart chartData={this.props.seamaState.seamaWaterQuality["chlorine"]}/>*/}
                            </div>
                            <div className= "WaterQualitySecondaryChart2Item">
                                <p>WaterQualitySecondaryChart1Item</p>
                                <p>WaterQualitySecondaryChart2Item</p>
                                <p>WaterQualitySecondaryChart3Item</p>
                                <p>WaterQualitySecondaryChart4Item</p>
                                <p>WaterQualitySecondaryChart5Item</p>
                                <p>WaterQualitySecondaryChart6Item</p>
                                <p>WaterQualitySecondaryChart7Item</p>
                                <p>WaterQualitySecondaryChart8Item</p>
                                <p>WaterQualitySecondaryChart9Item</p>
                                <p>WaterQualitySecondaryChart1Item</p>
                                <p>WaterQualitySecondaryChart2Item</p>
                                <p>WaterQualitySecondaryChart3Item</p>
                                <p>WaterQualitySecondaryChart4Item</p>
                                <p>WaterQualitySecondaryChart5Item</p>
                                <p>WaterQualitySecondaryChart1Item</p>
                                <p>WaterQualitySecondaryChart2Item</p>
                                <p>WaterQualitySecondaryChart3Item</p>
                                <p>WaterQualitySecondaryChart4Item</p>
                                <p>WaterQualitySecondaryChart5Item</p>
                                <p>WaterQualitySecondaryChart6Item</p>
                                <p>WaterQualitySecondaryChart7Item</p>
                                {/*<SeamaWaterTdsChart chartData={this.props.seamaState.seamaWaterQuality["tds"]}/>*/}
                            </div>
                    </div>
                </div>

            </div>
        );

    }
}

export default SeamaWaterQuality;
