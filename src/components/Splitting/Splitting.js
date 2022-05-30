import React from 'react';
import Checkbox from '../UI/Checkbox';
import Radio from '../UI/Radio';
import Styles from './Splitting.module.css';

const radioOptions = [
    {
        name: "standard",
        group: "splitting",
        id:"standard",
        text:"Standard"
    },
    {
        name: "ssbased",
        group: "splitting",
        id:"ssbased",
        text:"Sample Source Based"
    }
]

const checkBoxOptions = [
    {
        name: "email",
        group: "subsplitting",
        id:"email",
        text:"Email"
    },
    {
        name: "phone",
        group: "subsplitting",
        id:"phone",
        text:"Phone"
    },
    {
        name: "text",
        group: "subsplitting",
        id:"text",
        text:"Text"
    },
    {
        name: "eToP",
        group: "subsplitting",
        id:"eToP",
        text:"Email to Phone"
    },
    {
        name: "pToT",
        group: "subsplitting",
        id:"pToT",
        text:"Phone to Text"
    }
]


const Splitting = (props) => {

    const clickedHandler = (e) => {
        e.target.childElementCount !== 0 && e.target.querySelector('input').click();
    }

    return(
        <React.Fragment>
        <div className={Styles.SplittingContainer}>
            {radioOptions.map((item,index) => 
            <div className={Styles.SplittingRadioGroup  + ` ${props.config.selection===item.id ? Styles.ActiveSplitting : ""}`} onClick={clickedHandler}>
                <Radio key={item.id} id={item.id} groupName={item.group} text={item.text} active={props.config.selection} clicked={props.clicked}/>
            </div>
            )}          
        </div>
        <div className={Styles.SplittingCheckContainer}>
            {
                checkBoxOptions.map((item, index) => {
                    return (
                        <div className={Styles.SplittingCheckGroup}>
                            <Checkbox key={item.id} id={item.id} text={item.text} checked={props.config[item.id]} disabled={props.config.selection ? false:true} clicked={props.checkClicked}/>
                        </div>
                    )
                })
            }
        </div>
        <div className={Styles.SplittingOutputContainer}>
            <label for="exportpath">Export Folder Path:</label>
            <input type="text" id="exportpath" name="exportpath" value={props.config.outPath} onChange={(e)=> props.outPathHandler(e.target.value)} placeholder='Enter the folder path'/>
        </div>
        </React.Fragment>
    );
}

export default Splitting;