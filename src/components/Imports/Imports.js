import Styles from './Imports.module.css';
import db from '../../db/db';
import Radio from '../UI/Radio';

const Imports = (props) => {
    let clientObj=null;
    for(let client of db){
        if(client.id===props.activeClient){
            clientObj=client;
        }
    }
    let radioOptions=Object.keys(clientObj.imports);

    const clickedHandler = (e) => {
        e.target.childElementCount !== 0 && e.target.querySelector('input').click();
      }

    return (
        <div className={Styles.ImportsContainer}>
            <div className={Styles.ImportsInputContainer}>
              <label for="inputsource">Input Source:</label>
              <input type="text" id="inputsource" name="inputsource" value={props.currentImportSource} onChange={(e)=> props.importSourceChangeHandler(e.target.value)} placeholder='Enter the file path'/>
            </div>
            <div className={Styles.ImportsRadioContainer}>
                {radioOptions.map(
                    (item) => 
                    <div className={Styles.ImportsRadioGroup  + ` ${props.activeImport===item ? Styles.ActiveImport : ""}`} onClick={clickedHandler}>
                        <Radio id={item} groupName='imports' text={item} active={props.activeImport} clicked={props.clicked}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Imports;