import { Button, Card, CardActionArea, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Check, Close } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import pic from '../images/enoch.jpg';

export default function SingleContestant(props) {
    const [selection,setSelection] = useState(null)
    

    const {contestants,selectionHandler,portfolio} = props
    const {memberDetails} = contestants
  
    return (
       <>
       <div className="single-contestant">
       <div className="contestant-container inlined-items">
                            <div className="down-layer">
                                <Card className="contestant">
                                    <CardActionArea>
                                        <img className='contestant-img' src={pic} />
                                    </CardActionArea>
                                    <CardContent className='card-content'>
                                        <Typography className='card-title'>
                                            {memberDetails.surname+ " " +memberDetails.otherNames}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </div>
                            <div className="top-layer">

                            </div>
                        </div>
                        <div className='inline-items'>
                        <Button className={selection === 'yes' ? 'yes-button' : 'raw-btn'} 
                        onClick={()=>{
                            setSelection('yes')
                            selectionHandler(contestants,portfolio,true)
                        }}
                        startIcon={<Check/>}
                        variant='contained' color='primary' >
                            Yes</Button> 
                        <Button className={selection === 'no' ? 'yes-button' : 'raw-btn'}   color='primary'
                        onClick={()=>{
                            setSelection('no')
                            selectionHandler(contestants,portfolio,true)
                        }}
                        startIcon={<Close/>}
                        variant='contained' >No</Button>
                        </div>
       </div>
       
       </>
    )
}
