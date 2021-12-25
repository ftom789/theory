import React from 'react';
import styles from './styles.module.scss';
import {Timer} from '../Timer/timer';
import { Question } from './../Question/Question';

export class Form extends React.Component {
    state: any;

    constructor(props: any) {
      super(props)
      this.state = {
          currentQ:0
      }

    }
    
    render() {
        let questions=this.props.children as Question[]

        return (
            <div dir="rtl" className={styles.form}>
                <Timer/>
                {questions[this.state.currentQ]}
                
                <button id={styles.next} onClick={()=>{if(this.state.currentQ+1!==questions.length)this.setState({...this.state,currentQ:this.state.currentQ+1})}}>הבא</button>
                <button id={styles.back} onClick={()=>{if(this.state.currentQ!==0)this.setState({...this.state,currentQ:this.state.currentQ-1})}}>קודם</button>
            </div>
        )
    }
}