import React from 'react';
import {Title} from './title/title'
import {Option} from './option/option'
import styles from './styles.module.scss';

export interface data{
  title:Title,
  options:Option[],
  img:string
}


export class Question extends React.Component {
    state: any;

    constructor(props: any) {
      super(props)
      this.state = {
      }

    }
    
    render() {
      let form=(this.props.children as data)
      return (
        <div dir="rtl" >
            {form.title}
            <div className={styles.form}>
            <form className={styles.option}>
              {form.options}
                <img src={form.img}/>
              </form>
            </div>
        </div>
      )
    }
}
