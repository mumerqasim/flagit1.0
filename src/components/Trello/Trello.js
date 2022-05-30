import React from 'react';
import Checkbox from '../UI/Checkbox';
import Styles from './Trello.module.css';

const inputOptions = [
    {
        name: "email",
        group: "trello",
        id:"email",
        text:"Email N-size"
    },
    {
        name: "phone",
        group: "trello",
        id:"phone",
        text:"Phone N-size"
    },
    {
        name: "text",
        group: "trello",
        id:"text",
        text:"Text N-size"
    },
    {
        name: "eToP",
        group: "trello",
        id:"eToP",
        text:"Email to Phone N-size"
    },
    {
        name: "pToT",
        group: "trello",
        id:"pToT",
        text:"Phone to Text N-size"
    }
]

const Trello = (props) => {
    return (<div className={Styles.TrelloContainer}>
            {
                inputOptions.map(item => {
                    return(
                    <div className={Styles.TrelloInputContainer} key={item.id}>
                    <label for="totalsamples">{item.text+':'}</label>
                    <input type="number" id={item.id} min="1" name={item.id} value={props.config[item.id]} onChange={(e)=> props.inputChanged(e.target.value, item.id)} disabled={!(props.splitting[item.id])} placeholder={'Enter the ' + item.text}/>
                    </div>
                    )
                })
            }
            <div className={Styles.CheckboxContainer}>
                <div>
                    <Checkbox key={'1'} id='language' text={'Include Language Codes'} checked={props.config.language} clicked={props.checkClicked}/>
                </div>
                <div>
                    <Checkbox key={'2'} id='os' text={'Include OS Codes'} checked={props.config.os} clicked={props.checkClicked}/>
                </div>
            </div>
            </div>
    );
}

export default Trello;