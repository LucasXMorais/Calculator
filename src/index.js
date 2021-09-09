document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector(".display");
    const butNum = document.querySelectorAll(".buttonNumber");
    const butOp = document.querySelectorAll(".buttonOperations");

    butNum.forEach(number => {
        number.addEventListener('click', updateDisplay);
    });
    butOp.forEach(operator => {
        operator.addEventListener('click', updateDisplay);
    });


    let calculation = [];
    const operators = [" + ", " - ", " * ", " / "];
    function updateDisplay(){

        let digit = this.getAttribute('id');

        if (digit != "=" && digit != "del"){
            if (operators.includes(digit)) {
                if (!operators.includes(calculation[calculation.length-1]) && calculation.length != 0) {
                    calculation.push(String(digit)); 
                    display.textContent = calculation.join('');
                };
            } else {
                calculation.push(String(digit));
                display.textContent = calculation.join('');
            }   

        } else if (digit === "del" && calculation.length != 0) {
            calculation = calculation.slice(0,calculation.length-1);
            display.textContent = calculation.join('');                
        }

        if (digit === "=" && calculation.length != 0){
            if (operators.includes(calculation[calculation.length-1])) {calculation = calculation.slice(0,calculation.length-1);};
            calculation = calculation.join('').split(' ');  

            console.log(calculation.join(''));

            while (1) {
                let iX = calculation.indexOf('*');
                let iD = calculation.indexOf('/');
                console.log('iX : ', iX,' iD :', iD);
                if (iX === -1 && iD === -1){
                    break;
                } 
                if (iX != -1 && iD != -1){
                    if (iX < iD){
                        let result = parseFloat(calculation[iX-1]) * parseFloat(calculation[iX+1]);
                        calculation.splice(iX-1, 3, String(result));
                    } else {
                        let result = parseFloat(calculation[iD-1]) / parseFloat(calculation[iD+1]);
                        calculation.splice(iD-1, 3, String(result));
                    }
                } else {
                    if (iX > iD){
                        let result = parseFloat(calculation[iX-1]) * parseFloat(calculation[iX+1]);
                        calculation.splice(iX-1, 3, String(result));
                    } else {
                        let result = parseFloat(calculation[iD-1]) / parseFloat(calculation[iD+1]);
                        calculation.splice(iD-1, 3, String(result));
                    }
                }
            }

            while(1) {
                let iP = calculation.indexOf('+');
                let iM = calculation.indexOf('-');
                console.log('iP : ', iP,' iM : ', iM);
                if (iP === -1 && iM === -1){
                    break;
                } 
                if (iP != -1 && iM != -1){
                    if (iP < iM){
                        let result = parseFloat(calculation[iP-1]) + parseFloat(calculation[iP+1]);
                        calculation.splice(iP-1, 3, String(result));
                    } else {
                        let result = parseFloat(calculation[iM-1]) - parseFloat(calculation[iM+1]);
                        calculation.splice(iM-1, 3, String(result));
                    }
                } else {
                    if (iP > iM){
                        let result = parseFloat(calculation[iP-1]) + parseFloat(calculation[iP+1]);
                        calculation.splice(iP-1, 3, String(result));
                    } else {
                        let result = parseFloat(calculation[iM-1]) - parseFloat(calculation[iM+1]);
                        calculation.splice(iM-1, 3, String(result));
                    }
                }
            }

            display.textContent = calculation.join(''); 
        }
        console.log(digit, calculation);
    };
});
