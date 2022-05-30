import Styles from './Checking.module.css';

const Checking = (props) => {
    return (
        <div className={Styles.CheckingContainer}>
            <label for="checking">Flag Check Codes</label>
            <textarea type="text" id="checking" name="checking" value={props.value} onChange={(e)=> props.checkingChanged(e.target.value)} placeholder='Enter the flag checking codes'/>
        </div>
    )
}

export default Checking;