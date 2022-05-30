import Checkbox from '../UI/Checkbox';
import Styles from './Flagging.module.css';

const Flagging = (props) => {

    return(
    <div className={Styles.FlaggingContainer}>
        <div className={Styles.FlaggingGroup}>
            <Checkbox key={'1'} id={props.standardConfig.id} text=' Include Standard Flag Codes' checked={props.standardConfig.checked} clicked={props.standardClicked}/>
        </div>
        <div className={Styles.FlaggingGroup}>
            <Checkbox key={'2'} id={props.customConfig.id} text=' Include Custom Flag Codes' checked={props.customConfig.checked} clicked={props.customClicked}/>
            <div className={Styles.CustomInputContainer}>
              <label htmlFor="customvariables">Variable(s):</label>
              <input type="text" id="customvariables" name="customvariables" value={props.customConfig.variables} onChange={(e)=> props.customVariableChangeHandler(e.target.value)} placeholder="Enter variable names separated by commas"/>
              <label htmlFor="customcodes">Custom Codes:</label>
              <textarea id='customcodes' value={props.customConfig.codes} onChange={(e)=> props.customCodeChangeHandler(e.target.value)} placeholder='Enter custom flagging codes'/>
            </div>
        </div>
    </div>);
}

export default Flagging;