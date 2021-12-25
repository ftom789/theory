import React from 'react';
import {Form} from '../Form/form'
import axios from 'axios';
import { Question ,data} from './../Question/Question';
import {Option} from '../Question/option/option';
import {Title} from '../Question/title/title';


function shuffle(array:Array<any>) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

interface Quest{
    num:number,
    question:string,
    options:string[]
    category:string,
    image:string
}

class QuestionObj
{
    private reference:React.RefObject<Question>

    public get ref()
    {
        return this.reference;
    }

    public set ref(value:React.RefObject<Question>)
    {
        this.ref=value;
    }


    private object:JSX.Element

    public get obj()
    {
        return this.object;
    }

    public set obj(value:JSX.Element)
    {
        this.object=value;
    }
    

    constructor(reference:React.RefObject<Question>,obj:JSX.Element)
    {
        this.reference=reference;
        this.object=obj;
        
    }

    public getSelectedAnswer()
    {
        let options=(this.ref.current?.props.children as data).options;
        for (let i=0;i<options.length;i++)
        {
            if(options[i].radioRef.current?.checked)
            {
                return options[i];
            }
        }
        return null;
    }

    public isSelectedAnswerTrue()
    {
        let selectedOpt=this.getSelectedAnswer();
        return selectedOpt?.option.isTrue;
    }

}

export class Questions extends React.Component {
    state: any;

    constructor(props: any) {
      super(props)
        this.state = {
            questions:[] as [],

        }

    }


    
      
    async GetQuestions():Promise<JSX.Element[]>
    {
    let data=await axios.get("http://ftom789.ddns.net:8000/questions");
    let q=data.data as Quest[];
    let questions:QuestionObj[]=[]
    let reference=React.createRef() as React.RefObject<Question>
    q.forEach((element:Quest,index:number) => {
        questions.push(
            (
                ()=>{
            let obj=<Question ref={reference} key={index}>{{title:<Title>{element.question}</Title>,
            options:[
                (()=>{return element.options.map((ele,i) => {
                    return <Option name="option" key={i}>{ele}</Option>
                    });})()
            ],
            img:element.image
            
            }}</Question>
            return new QuestionObj(reference,obj);
        })())
    });

    shuffle(questions)
    
    return new Promise((resolve)=>{
        resolve(questions.map((value)=>{return value.obj}))
    })
    }
    
    componentDidMount()
    {
        (
            ()=>{
                this.GetQuestions().then(
                    (data)=>{this.setState({...this.state,questions:data})}
                        )
            }
        )()
    }
    
    render() {
        

        return (
            <div>

            <Form>
            {
                this.state.questions
            }
            

            </Form>
            </div>
        )
    }
}