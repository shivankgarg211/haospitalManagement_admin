
import { verifyRole } from '../../../App'
import './Dash.css'
import Graph from './Graph'


function Dash() {



  return (
   <>
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" ></link>
   <div class="container">
   <div class="row">
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Employee</h6>
                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Total Employee<span class="f-right">351</span></p>
                </div>
            </div>
        </div>

        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-green order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Patient</h6>
                    <h2 class="text-right"><i class="fa fa-rocket f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Total Patient<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Appoiment</h6>
                    <h2 class="text-right"><i class="fa fa-refresh f-left"></i><span>486</span></h2>
                    <p class="m-b-0">Total Appoiment<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        <div class="col-md-4 col-xl-3">
            <div class="card bg-c-pink order-card">
                <div class="card-block">
                    <h6 class="m-b-20">Revenue</h6>
                    <h3 class="text-right"><i class="fa fa-credit-card f-left"></i><span>486</span></h3>
                    <p class="m-b-0">Total Revenue<span class="f-right">351</span></p>
                </div>
            </div>
        </div>
        <Graph/>
    </div>
    {/* <Graph/> */}
   </div>
   </>
   
  
  )
}

export default Dash
