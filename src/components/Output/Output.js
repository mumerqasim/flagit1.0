import db from '../../db/db';
import Styles from './Output.module.css';

const Output = (props) => {
    let clientObj=null;
    let currentOutput='';
    for(let item in db){
        if(db[item].id===props.currentConfig.client){
            clientObj=db[item];
        }
    }

    for(let key in props.currentConfig){
        if(props.currentConfig.client){
            if(key==='imports' && props.currentConfig['imports']){
                let importStatement=clientObj.imports[props.currentConfig['imports'].format];
                if(props.currentConfig['imports'].currentImportSource && importStatement){
                    currentOutput+=importStatement.replace('filepath', `"${props.currentConfig['imports'].currentImportSource}"`);
                }else{
                    importStatement && (currentOutput+=importStatement);
                }
            }
            if(key==='flagging' && (props.currentConfig['flagging'].custom.checked || props.currentConfig['flagging'].standard.checked)){
                currentOutput+=clientObj.flagging.codes.codeInitials;
                if(props.currentConfig.flagging.standard.checked){
                    currentOutput+=clientObj.flagging.codes.standardCodes;
                }
                if(props.currentConfig.flagging.custom.checked){
                    currentOutput+=props.currentConfig['flagging'].custom.codes;
                }
                currentOutput+= `\n\n` + clientObj.flagging.codes.codeLasts + `\n\n`;
                currentOutput+=clientObj.flagging.retain.retainInitials
                if(props.currentConfig.flagging.standard.checked){
                    currentOutput+= ' ' + clientObj.flagging.retain.standardVariables;
                }
                if(props.currentConfig.flagging.custom.checked){
                    let varArray = props.currentConfig['flagging'].custom.variables.trim().split(',');
                    let variables = ' ' + varArray.join(' ');
                    currentOutput+=variables;
                }
                currentOutput=currentOutput.trim()+';';
            }
            if(key==='scrubbing' && props.currentConfig.scrubbing.scrublistPath && props.currentConfig.scrubbing.scrubNames){
                let filePath = clientObj.scrubbing.filePath;
                filePath=`\n\n` + filePath.replace('filepath', (`'` + props.currentConfig['scrubbing'].scrublistPath + `'`))
                currentOutput+=filePath;
                let names = clientObj.scrubbing.names;
                names=names.replaceAll('namelist', props.currentConfig.scrubbing.scrubNames);
                currentOutput+=names;
            }
            if(key==='splitting' && props.currentConfig.splitting.selection){
                for(let key in props.currentConfig.splitting){
                    if(key!=='selection' && props.currentConfig.splitting[key] && (key === 'email' || key === 'phone' || key === 'text' || key === 'eToP' || key === 'pToT')){
                        currentOutput+=clientObj.splitting[props.currentConfig.splitting.selection][key];
                    }
                }
                if((props.currentConfig['splitting'].email || props.currentConfig['splitting'].phone || props.currentConfig['splitting'].text || props.currentConfig['splitting'].eToP || props.currentConfig['splitting'].pToT)){
                    currentOutput+=clientObj.splitting.splittingLasts;
                }
                let folderPath = props.currentConfig.splitting.outPath ? () => {
                    if (props.currentConfig.splitting.outPath.charAt((props.currentConfig.splitting.outPath.length-1)) === '\\'){
                        return props.currentConfig.splitting.outPath;
                    }else{
                        return props.currentConfig.splitting.outPath + '\\';
                    }
                } : '';
                if(props.currentConfig['splitting'].email){
                    currentOutput+=clientObj.splitting.exports.email.replace('folderpath', folderPath);
                }
                if(props.currentConfig['splitting'].phone){
                    currentOutput+=clientObj.splitting.exports.phone.replace('folderpath', folderPath);
                }
                if(props.currentConfig['splitting'].text){
                    currentOutput+=clientObj.splitting.exports.text.replace('folderpath', folderPath);
                }
                if(props.currentConfig['splitting'].eToP){
                    currentOutput+=clientObj.splitting.exports.eToP.replace('folderpath', folderPath);
                }
                if(props.currentConfig['splitting'].pToT){
                    currentOutput+=clientObj.splitting.exports.pToT.replace('folderpath', folderPath);
                }
            }
            if(key==="freq" && props.currentConfig.freq.outPath && props.currentConfig.freq.totalSamples){
                let folderPath = props.currentConfig.freq.outPath ? () => {
                    if (props.currentConfig.freq.outPath.charAt((props.currentConfig.freq.outPath.length-1)) === '\\'){
                        return props.currentConfig.freq.outPath;
                    }else{
                        return props.currentConfig.freq.outPath + '\\';
                    }
                } : '';
                currentOutput+=clientObj.frequencies.freqProcInitials.replace('folderpath', folderPath);
                if(Number(props.currentConfig.freq.totalSamples)===1){
                    currentOutput+=clientObj.frequencies.freqCodeInitials;
                    let retain = (() => {
                        let str=''
                        if(props.currentConfig.flagging.standard.checked){
                            str+=clientObj.flagging.retain.standardVariables.replace('placeholder1','');
                            str=str.replace('placeholder2','');
                            str=str.replace('placeholder3','');
                            str=str.replace('firstname','');
                            str=str.replace('lastname','');
                            str=str.replace('email','');
                            str=str.replace('token','');
                        }
                        if(props.currentConfig.flagging.custom.checked){
                            let varArray = props.currentConfig['flagging'].custom.variables.trim().split(',');
                            let variables = ' ' + varArray.join(' ');
                            str+=variables;
                        }
                        str=str.trim()+';';
                        return str;
                    })()
                    currentOutput+=retain;
                    currentOutput+=clientObj.frequencies.freqCodeLasts;
                } else {
                    for(let i=1; i<=props.currentConfig.freq.totalSamples; i++){
                        currentOutput+=clientObj.frequencies.freqCodeInitials;
                        let retain = (() => {
                            let str=''
                            if(props.currentConfig.flagging.standard.checked){
                                str+=clientObj.flagging.retain.standardVariables.replace('placeholder1','');
                                str=str.replace('placeholder2','');
                                str=str.replace('placeholder3','');
                                str=str.replace('firstname','');
                                str=str.replace('lastname','');
                                str=str.replace('email','');
                                str=str.replace('token','');
                            }
                            if(props.currentConfig.flagging.custom.checked){
                                let varArray = props.currentConfig['flagging'].custom.variables.trim().split(',');
                                let variables = ' ' + varArray.join(' ');
                                str+=variables;
                            }
                            str=str.trim()+';';
                            return str;
                        })()
                        currentOutput+=retain;
                        currentOutput+=`\nwhere sampletype=${i};`
                        currentOutput+=clientObj.frequencies.freqCodeLasts;
                    }
                }
                currentOutput+=clientObj.frequencies.freqProcLasts;
            }   
            if(key==='trello' && (props.currentConfig['trello'].email || props.currentConfig['trello'].phone || props.currentConfig['trello'].text || props.currentConfig['trello'].eToP || props.currentConfig['trello'].pToT)){
                let slectionArray=[];
                currentOutput+=clientObj.trello.trelloInitials;
                for(let key in props.currentConfig.trello){
                    if(key!=='os' && key!=='language' && props.currentConfig.trello[key]){
                        if(key === 'email'){
                            currentOutput+=clientObj.trello[key].replace('emailNsize',props.currentConfig.trello.email);
                            slectionArray.push('emails');
                        }
                        if(key === 'phone'){
                            slectionArray.push('phones');  
                            currentOutput+=clientObj.trello[key].replace('phoneNsize',props.currentConfig.trello[key]);  
                        }
                        if(key === 'text'){
                            slectionArray.push('texts');     
                            currentOutput+=clientObj.trello[key].replace('textNsize',props.currentConfig.trello[key]);   }
                        if(key === 'eToP'){
                            slectionArray.push('emailtophones');    
                            currentOutput+=clientObj.trello[key].replace('eToPNsize',props.currentConfig.trello[key]);  
                        }
                        if(key === 'pToT'){
                            slectionArray.push('phonetotexts');       
                            currentOutput+=clientObj.trello[key].replace('pToTNsize',props.currentConfig.trello[key]);          
                        }
                    }
                }
                currentOutput+=clientObj.trello.trelloMiddle;
                currentOutput+=slectionArray.join(' ');
                currentOutput+=clientObj.trello.trelloLasts;
                currentOutput+=props.currentConfig.trello.language ? clientObj.trello.language : '';
                currentOutput+=props.currentConfig.trello.os ? clientObj.trello.os : '';               
            }
            if(key==='checking' && props.currentConfig.checking){
                currentOutput+=clientObj.checking.preFlagCheck;
                currentOutput+=props.currentConfig.checking + `\n\n`;
                currentOutput+=clientObj.checking.postFlagCheck;
            }
        }
    }

    return(
        <div className={Styles.OutputContainer}>
            <h3>Output</h3>
            <textarea value={currentOutput}/>
        </div>
    );
}

export default Output;