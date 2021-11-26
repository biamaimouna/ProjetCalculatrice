import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculatrice';
  subDisplayText = '';
  mainDisplayText = '';
  operand1 = 0;
  operand2 = 0;
  operator = ''; 
  calculationString = '';
  // This string  denotes the operation being performed
  answered = false;
  //  flag to check whether the solution has been processed
  operatorSet = false; 

  pressKey(key: string) {
    if (key === '/' || key === 'x' || key === '-' || key === '+' || key === '') {
      const lastKey = this.mainDisplayText[this.mainDisplayText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainDisplayText === '')) {
        return;
      }
      this.operand1 = parseFloat(this.mainDisplayText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainDisplayText.length === 100) {
      return;
    }
    this.mainDisplayText += key;
  }
  allClear() {
    this.mainDisplayText = '';
    this.subDisplayText = '';
    this.operatorSet = false;
  }
  Clear(){
    if(this.mainDisplayText.length > 0){
      this.mainDisplayText = this.mainDisplayText.substring(0, this.mainDisplayText.length - 1);
      this.operatorSet = false;
    }
  }

  getAnswer() {
    this.calculationString = this.mainDisplayText;
    this.operand2 = parseFloat(this.mainDisplayText.split(this.operator)[1]);
    if (this.operator === '/') {
      if(this.operand2 != 0){
        this.subDisplayText = this.mainDisplayText;
        this.mainDisplayText = (this.operand1 / this.operand2).toString();
        this.subDisplayText = this.calculationString;
        if (this.mainDisplayText.length > 99) {
          this.mainDisplayText = this.mainDisplayText.substr(0, 99);
        }
      }else if(this.operand1 == 0 && this.operand2 == 0){
        this.subDisplayText = 'ERREUR: Indefini!';
        this.mainDisplayText = ''; 
      }else{this.subDisplayText = 'ERREUR: On ne divise pas un nombre par 0!';
        this.mainDisplayText = '';  
    } 
    } else if (this.operator === 'x') {
      this.subDisplayText = this.mainDisplayText;
      this.mainDisplayText = (this.operand1 * this.operand2).toString();
      this.subDisplayText = this.calculationString;
      if (this.mainDisplayText.length > 99) {
        this.mainDisplayText = 'ERROR';
        this.subDisplayText = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      this.subDisplayText = this.mainDisplayText;
      this.mainDisplayText = (this.operand1 - this.operand2).toString();
      this.subDisplayText = this.calculationString;
    } else if (this.operator === '+') {
      this.subDisplayText = this.mainDisplayText;
      this.mainDisplayText = (this.operand1 + this.operand2).toString();
      this.subDisplayText = this.calculationString;
      if (this.mainDisplayText.length > 99) {
        this.mainDisplayText = 'ERREUR';
        this.subDisplayText = 'Range Exceeded';
      }
    } else if (this.operator == '') {
      this.operand1 = parseFloat(this.mainDisplayText);
      this.subDisplayText = this.mainDisplayText;
      this.mainDisplayText = (this.operand1).toString();
    } else {
      this.mainDisplayText = 'ERREUR: Operation Invalide!';
    }
    this.answered = true;
    this.operatorSet=false;
    this.operand1 = 0;
    this.operand2 = 0;
    this.operator = ''; 
    this.calculationString = '';
  }
}

