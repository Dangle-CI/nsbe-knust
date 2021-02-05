import {AppBar, Button, CircularProgress, Container, Grid, StylesProvider} from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../contestant_sample_data';
import './cont_index.css';
import MultiContestant from './MultiContestant';
import SingleContestant from './SingleContestant';
import axios from 'axios'
import {displayMessage} from '../components/AlertMessage';
import {navigate} from 'gatsby'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

export default function ContestantsIndex() {
    const classes = useStyles();
    const [selections, setSelections] = useState([])
    const [voteData, setVoteData] = useState([])
    const [isloading, setloading] = useState(false)
    const [name, setName] = useState('')
    const manageSelections = (chosen, portfolio, multi) => {
        // check if user has made a selection 
        // previously for the portfolio
        let prev_selected = selections.filter(item => item.title === portfolio)


        if (prev_selected.length === 0) {
            //selection has not be made previously
            let new_item = {
                title: portfolio, is_multi: multi, contestant: chosen
            }
            let prev_item = selections
            prev_item.push(new_item)
            setSelections(prev_item)
        } else {
            //selections has been made before, therefore update it
            let res = selections.map((item) => {
                if (item.title === portfolio) {
                    item.contestant = chosen

                }
                return item
            })
            setSelections(res)
        }

    }

    const validateSelections = () => {
        let portfolios = voteData.map(item => item.title)

        let res = true

        let voted_portfolios = selections.map(item => item.title)

        for (let i = 0; i < portfolios.length; i++) {
            if (!voted_portfolios.includes(portfolios[i])) {

                displayMessage('please cast a vote for ' + portfolios[i], 'error')
                res = false //do not proceed with submission
                break
            }

        }
        return res
    }

    const submitdata = () => {

        let is_data_valid = validateSelections()
        if (is_data_valid === false) {
            return
        }
        setloading(true)
        let ids = selections.map((item) => item.contestant)
        // let voter = JSON.parse( sessionStorage.getItem('voter'))
        let id = sessionStorage.getItem('id')

        let url = BASE_URL + `/voters/${id}`

        axios.patch(url, ids).then(resp => {
            setloading(false)
            console.log(resp.data)
            displayMessage('Thank you for voting', 'success')
            sessionStorage.clear()
            setTimeout(() => {
                navigate('/')
            }, 1500)


        }).catch(e => {
            setloading(false)
            displayMessage(e.response.data.message, 'error')
        })

    }
    useEffect(() => {

        let name = sessionStorage.getItem('name')
        if (name === null) {
            navigate('/')
        } else {
            setName(name)
            setVoteData(JSON.parse(sessionStorage.getItem('vote_data')))

        }

    }, [])

    return (

        <>
            <StylesProvider injectFirst>
                <AppBar className='appbar' position='fixed'>
                    <Typography className='app-title'>NSBE</Typography>
                </AppBar>
                <Container className='page-container'>
                    <h2>Welcome {name.replace(/"/g, "").toUpperCase()}</h2>
                    <ul>
                        <li>Select a contestant for each portfolio</li>
                        <li>Click on submit to finish the voting process</li>
                        <li>Remember you can only vote once</li>
                    </ul>

                    {
                        voteData.map((portfolio) => {
                            return <Accordion key={portfolio.title} className='accordion'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    className='accordion-header'
                                >
                                    <Typography
                                        className={classes.heading + ' accordion-title'}>{portfolio.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-content'>
                                    <Grid container spacing={0} className='grid-container'>
                                        {portfolio.multi === true ? <MultiContestant portfolio={portfolio.title}
                                                                                     selectionHandler={manageSelections}
                                                                                     contestants={portfolio.contestants}/> :
                                            <SingleContestant portfolio={portfolio.title}
                                                              selectionHandler={manageSelections}
                                                              contestants={portfolio.contestants[0]}/>
                                        }


                                    </Grid>


                                </AccordionDetails>
                            </Accordion>
                        })
                    }


                    <div className="submit-btn-area">
                        <Button
                            disabled={isloading}
                            endIcon={isloading && <CircularProgress style={{color: 'white'}} size={30}/>}
                            onClick={submitdata} variant='contained' className='submit-btn'> SUBMIT </Button>
                    </div>
                </Container>
            </StylesProvider>
        </>
    )
}
