import Classes from './Tabs.module.css';
import Radio from '../UI/Radio';

const tabsGroup = [
    {
        groupName:'tabs',
        id:'client',
        text:'Client'
    },
    {
        groupName:'tabs',
        id:'imports',
        text:'Imports',
    },
    {
        groupName:'tabs',
        id:'flagging',
        text:'Flagging',
    },
    {
        groupName:'tabs',
        id:'scrubbing',
        text:'Scrubbing',
    },
    {
        groupName:'tabs',
        id:'splitting',
        text:'Splitting',
    },
    {
        groupName:'tabs',
        id:'freq',
        text:'Frequencies',
    },
    {
        groupName:'tabs',
        id:'trello',
        text:'Trello Info.',
    },
    {
        groupName:'tabs',
        id:'checking',
        text:'Checking',
    }
];
const Tabs = (props) => {
    for(let i=0; i<tabsGroup.length-1; i++){
        tabsGroup[i+1].disabled = props.tabCount[i];
        // console.log(props.tabCount[i], tabsGroup[i]);
    }

    const clickedHandler = (e) => {
        e.target.childElementCount !== 0 && e.target.querySelector('input').click();
    }

    return(
        <div className={Classes.TabsContainer}>
            {
                tabsGroup.map((group) => 
                <div key={group.id} className={Classes.TabGroup + ` ${props.activeTab===group.id ? Classes.ActiveTab : "" }` + ` ${group.disabled ? Classes.Disabled : ""}`} onClick={clickedHandler}>
                    <Radio id={group.id} text={group.text} clicked={props.clicked} active={props.activeTab} disabled={group.disabled}/>
                </div>
                )
            }
        </div>
    );
}

export default Tabs;