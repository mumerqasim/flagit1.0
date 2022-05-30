import Styles from './Frequencies.module.css';


const Frequencies = (props) => {
    return(
        <div className={Styles.FrequenciesContainer}>
            <div className={Styles.FrequenciesInputContainer}>
              <label for="output">Export Folder Path:</label>
              <input type="text" id="output" name="output" value={props.config.outPath} onChange={(e)=> props.outPathHandler(e.target.value)} placeholder='Enter the export folder path'/>
            </div>
            <div className={Styles.FrequenciesInputContainer + ' ' + Styles.TotalSamplesContainer}>
              <label for="totalsamples">Number of Samples:</label>
              <input type="number" id="totalsamples" min="1" name="totalsamples" value={props.config.totalSamples} onChange={(e)=> props.totalSampleHandler(e.target.value)} placeholder='Total Samples'/>
            </div>
        </div>
    );
}

export default Frequencies;