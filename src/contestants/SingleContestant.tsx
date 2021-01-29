import {Button, Card, CardActionArea, CardContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Check, Close} from '@material-ui/icons';
import React, {useState} from 'react';
import {BASE_URL} from "../contestant_sample_data";

export default function SingleContestant(props) {
    const [selection, setSelection] = useState(null)


    const {contestants, selectionHandler, portfolio} = props
    const {memberDetails} = contestants

    return (
        <>
            <div className="single-contestant">
                <div className="contestant-container inlined-items">
                    <div className="down-layer">
                        <Card className="contestant">
                            <CardActionArea>
                                <img className='contestant-img'
                                     src={`${BASE_URL}/election/aspirant/${contestants.image}`}/>
                            </CardActionArea>
                            <CardContent className='card-content'>
                                <Typography className='card-title'>
                                    {memberDetails.surname + " " + memberDetails.otherNames}
                                </Typography>
                            </CardContent>

                        </Card>
                    </div>
                    <div className="top-layer">

                    </div>
                </div>
                <div className='inline-items'>
                    <Button className={selection === 'yes' ? 'yes-button' : 'raw-btn'}
                            onClick={() => {
                                setSelection('yes')
                                selectionHandler(contestants, portfolio, true)
                            }}
                            startIcon={<Check/>}
                            variant='contained' color='primary'>
                        Yes</Button>
                    <Button className={selection === 'no' ? 'yes-button' : 'raw-btn'} color='primary'
                            onClick={() => {
                                setSelection('no')
                                selectionHandler(contestants, portfolio, true)
                            }}
                            startIcon={<Close/>}
                            variant='contained'>No</Button>
                </div>
            </div>

        </>
    )
}
