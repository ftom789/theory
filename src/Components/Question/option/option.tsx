import React from 'react';
import styles from './styles.module.scss';

interface opt{
  answer:string,
  isTrue:boolean
}

export class Option extends React.Component<{name:string}> {
    state: any;
    radioRef:React.RefObject<HTMLInputElement>
    option:opt

    constructor(props: any) {
      super(props)
      this.state = {
        label:{
          style:{color:"black"}
        }
      }
      this.radioRef=React.createRef();

      this.option=this.props.children as opt;
    }
    
    render() {
      return (
        <React.Fragment> 
          <label onMouseOver={()=>{this.setState({...this.state,
          label:{...this.state.label,style:{...this.state.label.style,color:"green"}}})}} style={this.state.label.style} onMouseLeave={()=>{this.setState({...this.state,
            label:{...this.state.label,style:{...this.state.label.style,color:"black"}}})}} onMouseDown={()=>{if(this.radioRef.current!==null){
              this.radioRef.current.checked = true
            }}}>
          <input type="radio" name={this.props.name} ref={this.radioRef}/>
           {this.option.answer}</label>
           <br/>
        </React.Fragment>
      )
    }
}