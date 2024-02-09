function evaluateExpression(expression) {
    expression = expression.replace(/\s/g, '');

    let steps = [];

    while (/\(([^\(\)]+)\)/.test(expression)) {
        expression = expression.replace(/\(([^\(\)]+)\)/g, function(match, innerExpression) {
            const result = evaluateExpression(innerExpression).result;
            steps.push({ step: '(' + innerExpression + ')', result: result });
            return result;
        });
    }

    while (/(\d+)([\/\*])(\d+)/.test(expression)) {
        expression = expression.replace(/(\d+)([\/\*])(\d+)/g, function(match, operand1, operator, operand2) {
            const result = operator === '*' ? operand1 * operand2 : operand1 / operand2;
            const step = `${operand1} ${operator} ${operand2}`;
            steps.push({ step: step, result: result });
            return result;
        });
    }

    while (/(\d+)([+\-])(\d+)/.test(expression)) {
        expression = expression.replace(/(\d+)([+\-])(\d+)/g, function(match, operand1, operator, operand2) {
            const result = operator === '+' ? parseInt(operand1) + parseInt(operand2) : parseInt(operand1) - parseInt(operand2);
            const step = `${operand1} ${operator} ${operand2}`;
            steps.push({ step: step, result: result });
            return result;
        });
    }

    return { result: expression, steps: steps };
}

const input = prompt("Enter your mathematical expression: ");
const output = evaluateExpression(input);

console.log("Expression Steps:");
output.steps.forEach(step => {
    console.log(step.step + " = " + step.result);
});

console.log("Result: " + output.result);