import React from 'react';
import styles from './styles.module.scss'


export class Title extends React.Component {
    state: any;

    constructor(props: any) {
      super(props)
      this.state = {
      }


    }


    
    render() {
      let size=0;
      if(this.props.children&&this.props.children.toString().length)
      {
        size=80/this.props.children.toString().length
      }
      return (
        <div dir="rtl" className={styles.title}>
          <label id={styles.text} style={{fontSize:`${size}vw`}}> {this.props.children} </label>
        </div>
      )
    }
}
