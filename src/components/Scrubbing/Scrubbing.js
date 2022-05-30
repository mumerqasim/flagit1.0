import Styles from './Scrubbing.module.css';

const Scrubbing = (props) => {
    return (
        <div className={Styles.ScrubbingContainer}>
            <div className={Styles.InputContainer}>
              <label for="filePath">Scrublist File Path:</label>
              <input type="text" id="filePath" name="filePath" value={props.config.scrublistPath} onChange={(e)=> props.pathChange(e.target.value)} placeholder='Enter the file path'/>
            </div>
            <div className={Styles.InputContainer + ' ' + Styles.Names}>
              <label for="names">Names:</label>
              <textarea type="text" id="names" name="names" value={props.config.scrubNames} onChange={(e)=> props.nameChange(e.target.value)} placeholder='Enter the name strings separated by commas'/>
            </div>
        </div>
    );
}

export default Scrubbing;