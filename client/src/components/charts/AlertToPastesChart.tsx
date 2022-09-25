import React, { useEffect } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { chart } from "../../interfaces/interfaceChart";
import { useState } from "react";
import axios from "axios";
import { socket } from "../../App";


const AlertToPastesChart:React.FC = ()=>{
	const [AlertToPastesChartData, setAlertToPastesChartData] = useState<chart>();



    const dataCreator = async (tags:string[]) => {
        const allAlertsCount = (await axios.get('/get_alerts_count',{
            params: {
                searchTerm:tags
            }
        })).data
        const allPastesCount = await (await axios.get('/get_pastes_count')).data  
        setAlertToPastesChartData({
            labels:[`All Pastes (${allPastesCount})`,`All Alerts (${allAlertsCount})`],
            datasets:[{
                label: "Alerts TO Pastes Stats",
                data:[(allPastesCount-allAlertsCount)*100/allPastesCount,allAlertsCount*100/allPastesCount],
                backgroundColor:['red','green'],
                borderColor:'black',
            }]
        })
    }

    useEffect(()=>{
        socket.on('allTagsForChart',(tags)=>{
            dataCreator(tags)
        })
    },[])


    return <div className="AlertToPastesChart">
        {AlertToPastesChartData?
        (<Doughnut data={AlertToPastesChartData} options={{
            responsive: true,
            plugins:{
              legend:{
                labels:{
                    color:'black',
                    font:{
                        size:18
                    }
                }
              }

            }
        }} />) :
        (
            <div className="lds-ring2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }

    </div>
}

export default AlertToPastesChart