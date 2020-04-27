import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  initialValue = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;
  calculatorPower=false;
  powerOffGreeting=false;

  ngOnInit(): void {
  }

  inputNumber(v: string){
    if(this.calculatorPower){
      if(this.waitForSecondNumber)
      {
        this.initialValue = v;
        this.waitForSecondNumber = false;
      }else{
        this.initialValue === '0'? this.initialValue = v: this.initialValue += v;
      }
    }
  }

  calculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand += secondOp; 
      case '-': 
      return this.firstOperand -= secondOp; 
      case '*': 
      return this.firstOperand *= secondOp; 
      case '/': 
      return this.firstOperand /= secondOp; 
      case '√':
      return this.firstOperand = Math.sqrt(secondOp);
      case '=':
      return secondOp;
    }
  }

  inputOperation(op: string){
    if(this.calculatorPower){
      if(this.firstOperand === null){
        this.firstOperand = Number(this.initialValue);

      }else if(this.operator){
        const result = this.calculation(this.operator , Number(this.initialValue))
        this.initialValue = String(result);
        this.firstOperand = result;
      }
      this.operator = op;
      this.waitForSecondNumber = true;

      console.log(this.firstOperand);
    }
  }

  appendDecimal(){
    if(this.calculatorPower){
      if(!this.initialValue.includes('.')){
          this.initialValue += '.'; 
      }
    }
  }

  powerToggle(){
      const powerValue=this.calculatorPower;
      if(powerValue){
        this.powerOffGreeting=true;
        this.initialValue='Good Bye..'
        console.log(this.initialValue)
        setTimeout(()=>{
          this.calculatorPower=!powerValue;
          this.resetField()
        },2000);  
      } else{
        this.powerOffGreeting=false;
        this.calculatorPower=!powerValue;
      }
    }


  resetField(){
    this.initialValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
