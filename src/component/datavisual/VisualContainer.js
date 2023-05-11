import {VisualLineGraph} from "./VisualLineGraph"
import {VisualPieChart} from "./VisualPieChart"
import "./VisualContainer.css"

export const VisualContainer = ()=>{

    return(
        <div className="visual-container">
            <VisualLineGraph/>
            <VisualPieChart />

        </div>
    )
}

{/* <div id="graph" ><VisualLineGraph/></div>
<div id="pie"><VisualPieChart /></div> */}