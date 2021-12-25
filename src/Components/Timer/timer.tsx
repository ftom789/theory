import React from 'react';
import styles from './styles.module.scss'


export class Timer extends React.Component {
    state: any;
   
    constructor(props: any) {
      super(props)
      this.state = {
        time:40*60
      }
      
    }

    componentDidMount() {
      let timer=setInterval(()=>{
        this.setState({...this.state,
        time:this.state.time-=1})
        if (this.state.time===0)
        {
          clearTimeout(timer);
        }
      },1000)
  
    }
    
    convertTimetoStr(time:number):string {
      let min=Math.floor(time/60);
      let sec=time%60;
      let minStr=min.toString();
      let secStr=sec.toString();
      if (minStr.length<2){
        minStr=`0${minStr}`
      }
      if(secStr.length<2)
      {
        secStr=`0${secStr}`
      }
      if(min===0&&sec===0)
      {
        return "times up"
      }
      return `${minStr}:${secStr}`

    }
    
    render() {
      return (
    <div className={styles.cContainer}>
        <div className={styles.cText}>{this.convertTimetoStr(this.state.time)}</div>
        <svg id="yeah" viewBox="0 0 100 100">
            <path id="bg" stroke-linecap="round" stroke-width="4" stroke="#66ff33" fill="none" d="M50 2 
            a 48 48 0 0 1 0 96 
            a 48 48 0 0 1 0 -96">
            </path>
            
            <path id="progress" stroke-linecap="round" stroke-width="4" stroke="#66ff33" fill="none" d="M50 2 
            a 48 48 0 0 1 0 96 
            a 48 48 0 0 1 0 -96">
            </path>
        </svg>
        
    </div>
      )
    }
}
