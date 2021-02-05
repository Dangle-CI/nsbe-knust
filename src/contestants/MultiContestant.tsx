import {Card, CardActionArea, CardContent, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import './cont_index.css';
import {BASE_URL} from "../contestant_sample_data";

export default function MultiContestant(props) {
    const [selected, setSelected] = useState('')
    const {contestants, selectionHandler, portfolio} = props
    console.log(selected)
    return (
        <>
            {
                contestants.map((contestant) => {
                    const {memberDetails} = contestant
                    let name = memberDetails.surname + " " + memberDetails.otherNames
                    let id = memberDetails.memberId
                    return <Grid item key={contestant.name} xs={6} sm={3} className='grid-items'>
                        <div key={contestant.name} className="contestant-container" onClick={() => {
                            setSelected(id)
                            selectionHandler(contestant, portfolio, true)
                        }}>
                            <div key={contestant.name} className="down-layer">
                                <Card key={contestant.name} className="contestant">
                                    <CardActionArea key={contestant.name}>
                                        <img key={contestant.name} className='contestant-img'
                                             src={`${BASE_URL}/election/aspirant/${contestant.image}`}/>
                                    </CardActionArea>
                                    <CardContent className='card-content'>
                                        <Typography className='card-title'>{name}</Typography>
                                    </CardContent>

                                </Card>
                            </div>
                            <div key={contestant.name} className={selected === id ? 'top-layer' : ''}>
                                {selected === id ? '✅' : ''}
                            </div>
                        </div>
                    </Grid>
                })
            }

        </>
    )
}
