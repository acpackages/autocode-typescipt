export class AcNumberToWords {
    numberToWords(number: number, params: object = {}) {
      return this.numberToWordsEight(number);
    }
    numberToWordsOne(number: number, params: object = {}) {
      let result = "";
      if (number == 0) {
        result = "";
      }
      else if (number == 1) {
        result = "One";
      }
      else if (number == 2) {
        result = "Two";
      }
      else if (number == 3) {
        result = "Three";
      }
      else if (number == 4) {
        result = "Four";
      }
      else if (number == 5) {
        result = "Five";
      }
      else if (number == 6) {
        result = "Six";
      }
      else if (number == 7) {
        result = "Seven";
      }
      else if (number == 8) {
        result = "Eight";
      }
      else if (number == 9) {
        result = "Nine";
      }
      else if (number == 10) {
        result = "Ten";
      }
      else if (number == 11) {
        result = "Eleven";
      }
      else if (number == 12) {
        result = "Twelve";
      }
      else if (number == 13) {
        result = "Thirteen";
      }
      else if (number == 14) {
        result = "Fouteen";
      }
      else if (number == 15) {
        result = "Fifteen";
      }
      else if (number == 16) {
        result = "Sixteen";
      }
      else if (number == 17) {
        result = "Seventeen";
      }
      else if (number == 18) {
        result = "Eighteen";
      }
      else if (number == 19) {
        result = "Ninteen";
      }
      return result;
    }
    numberToWordsTwo(number: number, params: object = {}) {
      let result = "";
  
      if (number < 20) {
        result = this.numberToWordsOne(number);
      }
      else if (number > 19 && number < 30) {
        result = "Twenty " + this.numberToWordsOne(number % 20);
      }
      else if (number > 29 && number < 40) {
        result = "Thirty " + this.numberToWordsOne(number % 30);
      }
      else if (number > 39 && number < 50) {
        result = "Fourty " + this.numberToWordsOne(number % 40);
      }
      else if (number > 49 && number < 60) {
        result = "Fifty " + this.numberToWordsOne(number % 50);
      }
      else if (number > 59 && number < 70) {
        result = "Sixty " + this.numberToWordsOne(number % 60);
      }
      else if (number > 69 && number < 80) {
        result = "Seventy " + this.numberToWordsOne(number % 70);
      }
      else if (number > 79 && number < 90) {
        result = "Eighty " + this.numberToWordsOne(number % 80);
      }
      else if (number > 89 && number < 100) {
        result = "Ninty " + this.numberToWordsOne(number % 90);
      }
      return result;
    }
    numberToWordsThree(number: number, params: object = {}) {
      let result = "";
  
      if (number < 100) {
        result = this.numberToWordsTwo(number);
      }
      else {
        result = this.numberToWordsOne(number / 100) + " Hundred " + this.numberToWordsTwo(number % 100);
      }
      return result;
    }
    numberToWordsFour(number: number, params: object = {}) {
      let result = "";
  
      if (number < 1000) {
        result = this.numberToWordsThree(number);
      }
      else {
        result = this.numberToWordsTwo(number / 1000) + " Thousand " + this.numberToWordsThree(number % 1000);
      }
      return result;
    }
    numberToWordsFive(number: number, params: object = {}) {
      let result = "";
  
      if (number < 100000) {
        result = this.numberToWordsFour(number);
      }
      else {
        result = this.numberToWordsTwo(number / 100000) + " Lakh " + this.numberToWordsFour(number % 100000);
      }
      return result;
    }
    numberToWordsSix(number: number, params: object = {}) {
      let result = "";
  
      if (number < 10000000) {
        result = this.numberToWordsFive(number);
      }
      else {
        result = this.numberToWordsTwo(number / 10000000) + " Crore " + this.numberToWordsFive(number % 10000000);
      }
      return result;
    }
    numberToWordsSeven(number: number, params: object = {}) {
      let result = "";
  
      if (number < 1000000000) {
        result = this.numberToWordsSix(number);
      }
      else {
        result = this.numberToWordsTwo(number / 1000000000) + " Arab " + this.numberToWordsSix(number % 1000000000);
      }
      return result;
    }
    numberToWordsEight(number: number, params: object = {}) {
      let result = "";
      if (number < 100000000000) {
        result = this.numberToWordsSeven(number);
      }
      else {
        result = this.numberToWordsTwo(number / 100000000000) + " Kharab " + this.numberToWordsSeven(number % 100000000000);
      }
      return result;
    }
}
  