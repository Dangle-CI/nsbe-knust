import swal from 'sweetalert'

export const displayMessage = (msg,severity)=>{
    swal("", msg,severity);
}