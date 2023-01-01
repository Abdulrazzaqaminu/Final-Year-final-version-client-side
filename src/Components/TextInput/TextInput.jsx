import {React} from 'react';

const TextInput = ({...rest}) =>{
    return(
        <>
            <input {...rest} />
        </>
    )
}

export default TextInput;