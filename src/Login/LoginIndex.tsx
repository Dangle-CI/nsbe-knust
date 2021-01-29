import { Button, Card, CardContent,CircularProgress, FormGroup, StylesProvider, TextField } from '@material-ui/core'
import { navigate } from 'gatsby'
import React,{useState} from 'react'
import axios from 'axios'
import './login.css'
import { displayMessage } from '../components/AlertMessage'
import { BASE_URL } from '../contestant_sample_data'
export default function LoginIndex() {
    const [id,setId] = useState('')
    const [isloading,setloading] = useState(false)
    const login = ()=>{
        console.log('loggin in')
        setloading(true)
      
      axios.post(`${BASE_URL}/voters`,{
        memberId:id
      }).then(res=>{
       
        
            
            let aspirants = res.data.aspirants
            let aspirants_grouped = []
            let positions = []
             positions = aspirants.map(item => item.position)
            
             //remove duplicate positions
             positions = positions.filter((item, index) => {
                return positions.indexOf(item) === index;
            });

            //sort contestants into groups
                positions.forEach(position=>{
                    var contestant_list = aspirants.filter(aspirant=> aspirant.position === position)
                    aspirants_grouped.push({
                        title: position,
                        multi: contestant_list.length > 1 ? true : false,
                        contestants: contestant_list
                    })
                })
              let voter  =res.data.voterDetails
            
            sessionStorage.setItem('voter',JSON.stringify(voter))
            sessionStorage.setItem('name',JSON.stringify(voter.surname))
            sessionStorage.setItem('id',res.data.id)
            sessionStorage.setItem('vote_data', JSON.stringify(aspirants_grouped)) 
            setloading(false)
           navigate('/vote')
        
   
       

      }).catch(e=>{
          setloading(false)
          displayMessage(e.response.data.message,'error')
      })
      
    }
    return (
       <>
       <StylesProvider injectFirst>
       <div className="page">
           <div className="bg">

           </div>
           <div className="top">
               <div>
               <h6>NSBE-KNUST ELECTIONS</h6>
               </div>
               <div>
                  
                   <Card className='form-card'>
                      
                       <CardContent>
                           <h1>Login</h1>
                           <FormGroup >
                           <TextField label='Membership ID' value={id} onChange={(e)=>setId(e.target.value)} />
                           </FormGroup>
                           <div className='login-btn-area'>
                           <Button
                             endIcon={isloading && <CircularProgress style={{color:'white'}} size={30}/>}
                           disabled={isloading} onClick={login} className='login-btn' variant='contained'>LOGIN</Button>
                           </div>
                           

                          
                       </CardContent>
                   </Card>
               </div>
           </div>
       </div>
       </StylesProvider>
       </>
    )
}
