import './App.css';
import { useState,useEffect } from 'react';
import Tabs from './components/Tabs/Tabs';
import Clients from './components/Clients/Clients';
import db from './db/db';
import Output from './components/Output/Output';
import Imports from './components/Imports/Imports';
import Flagging from './components/Flagging/Flagging';
import Scrubbing from './components/Scrubbing/Scrubbing';
import Splitting from './components/Splitting/Splitting';
import Frequencies from './components/Frequencies/Frequencies';
import Trello from './components/Trello/Trello';
import Checking from './components/Checking/Checking';

function App() {
  const [activeTab,updateActiveTab] = useState('client');
  const [activeClient,updateActiveClient] = useState(null);
  const [activeImport,updateActiveImport] = useState(null);
  const [currentImportSource, updateCurrentImportSource] = useState('');
  const [standardFlagging, updateStandardFlagging] = useState({id:'standard',checked:false});
  const [customFlagging, updateCustomFlagging] = useState({id:'custom',checked:false,variables:'',codes:''});
  const [scrubbing,updateScrubbing] = useState({scrublistPath:'', scrubNames:''});
  const [splitting, updateSplitting] = useState({selection:'',email:false,phone:false,text:false,eToP:false,pToT:false,outPath:''});
  const [frequencies, updateFrequencies] = useState({outPath:'', totalSamples:1});
  const [checking, updateChecking] = useState('');
  const [trello, updateTrello] = useState({email:'',phone:'',text:'',eToP:'',pToT:'',language:false,os:false});
  const [currentConfig, updateCurrentConfig] = useState({client:null, imports:null, flagging:{standard:standardFlagging,custom:customFlagging}, scrubbing:scrubbing, splitting:splitting, freq:frequencies, trello:'null', checking:null});


  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.flagging.custom=customFlagging;
      newConfig.flagging.standard=standardFlagging;
      return newConfig;
    });
  },[standardFlagging,customFlagging]);

  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.freq.outPath=frequencies.outPath;
      newConfig.freq.totalSamples=frequencies.totalSamples;
      return newConfig;
    });
  },[frequencies.outPath,frequencies.totalSamples]);

  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.scrubbing.scrubNames=scrubbing.scrubNames;
      newConfig.scrubbing.scrublistPath=scrubbing.scrublistPath;
      return newConfig;
    });
  },[scrubbing.scrublistPath,scrubbing.scrubNames]);

  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.splitting=splitting;
      return newConfig;
    });
  },[splitting]);

  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.trello=trello;
      return newConfig;
    });
  },[trello]);

  useEffect(()=>{
    updateCurrentConfig(prevState => {
      let newConfig = {...prevState};
      newConfig.checking=checking;
      return newConfig;
    });
  },[checking]);



  const tabChangeHandler = (e) => {
    updateActiveTab(e);
  }

  const clientChangeHandler = (e) => {
    updateActiveClient(e);
    let newconfig = {...currentConfig};
    newconfig.client=e;
    updateCurrentConfig(newconfig);
  }

  const importChangeHandler = (e) => {
    updateActiveImport(e);
    let newconfig = {...currentConfig};
    newconfig.imports={"format":e,"currentImportSource":currentImportSource};
    updateCurrentConfig(newconfig);
  }

  const importSourceChangeHandler = (e) => {
    updateCurrentImportSource(e);
    let newconfig = {...currentConfig};
    newconfig.imports={"format":activeImport,"currentImportSource":e};
    updateCurrentConfig(newconfig);
  }

  const standardClickedHandler = (e) => {
    updateStandardFlagging((prevState) => {
      let currentStandardConfig={...prevState};
      currentStandardConfig.checked=!(currentStandardConfig.checked);
      return currentStandardConfig;
    });
  }

  const customClickedHandler = (e) => {
    updateCustomFlagging((prevState) => {
      let currentCustomConfig={...prevState};
      currentCustomConfig.checked=!(currentCustomConfig.checked);
      return currentCustomConfig;
    }, ()=>console.log(customFlagging));
  }

  const customVariableChangeHandler = (e) => {
    updateCustomFlagging((prevState) => {
      let currentCustomConfig={...prevState};
      currentCustomConfig.variables=e;
      return currentCustomConfig;
    });
  }

  const customCodeChangeHandler = (e) => {
    updateCustomFlagging((prevState) => {
      let currentCustomConfig={...prevState};
      currentCustomConfig.codes=e;
      return currentCustomConfig;
    });
  }

  const scrubPathChangeHandler = (e) => {
    updateScrubbing(prev => {
      let newObj = {...prev};
      newObj.scrublistPath=e;
      return newObj;
    })
  }

  const scrubNameChangeHandler = (e) => {
    updateScrubbing(prev => {
      let newObj = {...prev};
      newObj.scrubNames=e.trim();
      return newObj;
    })
  }

  const splittingSelectionHandler= (e) => {
    updateSplitting(prev => {
      let newConfig = {...prev}
      newConfig.selection=e;
      return newConfig;
    });
  }

  const splittingCheckboxHandler = (e) => {
    updateSplitting(prev => {
      let newConfig = {...prev}
      newConfig[e] = !(newConfig[e])
      return newConfig;
    });
  }

  const outPathChangedHandler = (e) => {
    updateSplitting(prev => {
      let newConfig = {...prev}
      newConfig.outPath = e.trim();
      return newConfig;
    });
  }

  const freqOutPathChangehandler = (e) => {
    updateFrequencies(prev => {
      let newConfig = {...prev}
      newConfig.outPath = e.trim();
      return newConfig;
    });
  }

  const totalSampleChangeHandler = (e) => {
    updateFrequencies(prev => {
      let newConfig = {...prev}
      newConfig.totalSamples = e.trim();
      return newConfig;
    });
  }

  const checkingChangeHandler = (e) => {
    updateChecking(e);
  }

  const trelloCheckboxChangeHandler = (e) => {
      if(e==='language'){
        updateTrello(prev => {
          let newConfig = {...prev}
          newConfig.language = !(newConfig.language);
          return newConfig;
        });
      }
      if(e==='os'){
        updateTrello(prev => {
          let newConfig = {...prev}
          newConfig.os = !(newConfig.os);
          return newConfig;
        });
      }
  }

  const trelloInputHandler = (e,id) => {
    updateTrello(prev => {
      let newConfig = {...prev}
      newConfig[id] = e;
      return newConfig;
    });
  }

  console.log(currentConfig);


  let tabCount=[];
  for(let item in currentConfig){
    if(item==='imports'){
      currentConfig['imports'] ? tabCount.push(!(currentConfig['imports'].format && currentConfig['imports'].currentImportSource!=='')) :  tabCount.push(true);
    } else if (item==='flagging'){
      // console.log(currentConfig);
      // console.log(currentConfig['flagging'].standard,currentConfig['flagging'].custom);
      currentConfig['flagging'] ? tabCount.push(!((currentConfig['flagging'].standard ? currentConfig['flagging'].standard.checked : false) || (currentConfig['flagging'].custom ? currentConfig['flagging'].custom.checked : false))) : tabCount.push(true);
    } else if (item==='scrubbing') {
      currentConfig['scrubbing'] ? tabCount.push(!(currentConfig[item].scrublistPath && currentConfig[item].scrubNames) ? (true) : false) : tabCount.push(true);
    } else if (item==='splitting') {
      currentConfig['splitting'] ? tabCount.push(!(currentConfig[item].selection && (currentConfig[item].email || currentConfig[item].phone || currentConfig[item].text || currentConfig[item].eToP || currentConfig[item].pToT) &&  currentConfig[item].outPath) ? (true) : false) : tabCount.push(true);
    } else if (item==='freq') {
      currentConfig['freq'] ? tabCount.push(!(currentConfig[item].outPath &&  currentConfig[item].totalSamples>=1) ? (true) : false) : tabCount.push(true);
    } else if (item==='trello') {
      currentConfig['trello'] ? tabCount.push(!(true) ? (true) : false) : tabCount.push(true);
    } else if (item==='checking') {
      currentConfig['checking'] ? tabCount.push(!(true) ? (true) : false) : tabCount.push(true);
    } else {
      tabCount.push(currentConfig[item]===null ? (true) : false);
    }
  }

  // console.log(activeTab, activeClient, activeImport,currentConfig,currentFlagSelection);
  return (
    <div className="App">
      <form className='form'>
         <Tabs tabCount={tabCount} activeTab={activeTab} clicked={tabChangeHandler}/>
         {activeTab=== 'client' ? <Clients activeClient={activeClient} list={db.map((item) => item.info)} clicked={clientChangeHandler}/> : null}
         {activeTab === 'imports' ? <Imports activeClient={activeClient} activeImport={activeImport} clicked={importChangeHandler} currentImportSource={currentImportSource} importSourceChangeHandler={importSourceChangeHandler}/> : null}
         {activeTab === 'flagging' ? <Flagging customConfig={customFlagging} standardConfig={standardFlagging} customClicked={customClickedHandler} standardClicked={standardClickedHandler} customVariableChangeHandler={customVariableChangeHandler} customCodeChangeHandler={customCodeChangeHandler}/>:null}
         {activeTab === 'scrubbing' ? <Scrubbing config={scrubbing} pathChange={scrubPathChangeHandler} nameChange={scrubNameChangeHandler}/> : null}
         {activeTab==='splitting' ? <Splitting config={splitting} clicked={splittingSelectionHandler} checkClicked={splittingCheckboxHandler} outPathHandler={outPathChangedHandler}/> : null}
         {activeTab==='freq' ? <Frequencies config={frequencies} outPathHandler={freqOutPathChangehandler} totalSampleHandler={totalSampleChangeHandler}/> : null}
         {activeTab==='trello' ? <Trello splitting={splitting} config={trello} checkClicked={trelloCheckboxChangeHandler} inputChanged={trelloInputHandler}/> : null}
         {activeTab==='checking' ? <Checking value={checking} checkingChanged={checkingChangeHandler} /> : null}
      </form>
      <Output currentConfig={currentConfig}/>
    </div>
  );
}

export default App;
