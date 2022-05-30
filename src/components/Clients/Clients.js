import Styles from './Clients.module.css';
import Radio from '../UI/Radio';
import { useState, useEffect } from 'react';

 const Clients = (props) => {
  const clickedHandler = (e) => {
    e.target.childElementCount !== 0 && e.target.querySelector('input').click();
  }
    return(
      <div className={Styles.ClientContainer}>
        {props.list.map((item) => 
          <div className={Styles.ClientGroup + ` ${props.activeClient===item.id ? Styles.ActiveClient : ""}`} key={item.id} onClick={clickedHandler}>
            <Radio id={item.id} groupName={item.group} text={item.name} active={props.activeClient} clicked={props.clicked}/>
          </div>)
        }
      </div>
    );
 }

 export default Clients;