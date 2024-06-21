import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import ConfettiExplosion from 'react-confetti-explosion';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [degreeMode, setDegreeMode] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleButtonClick = (label) => {
    if (label === '=') {
      try {
        const evaluation = eval(input.replace('×', '*').replace('÷', '/').replace('−', '-'));
        setResult(evaluation);
        setInput(evaluation.toString());
        if (input.includes('5') && input.includes('6')) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 1500);
        }
      } catch (e) {
        setResult('Error');
      }
    } else if (label === 'AC') {
      setInput('');
      setResult('');
    } else if (label === 'C') {
      setInput(input.slice(0, 0));
      setResult('');
    } else if (label === '+/-') {
      setInput((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (label === 'MC') {
      setMemory(0);
    } else if (label === 'M+') {
      setMemory((prev) => prev + parseFloat(result || input || 0));
    } else if (label === 'M-') {
      setMemory((prev) => prev - parseFloat(result || input || 0));
    } else if (label === 'MR') {
      setInput(memory.toString());
    } else if (label === 'Rad') {
      setDegreeMode(!degreeMode);
    } else {
      setInput(input + label);
    }
  };

  const calculateAdvanced = (func) => {
    let num = parseFloat(result || input);
    if (degreeMode && ['sin', 'cos', 'tan'].includes(func)) {
      num = num * (Math.PI / 180); // Convert to radians
    }

    let evaluation;
    switch (func) {
      case 'x²':
        evaluation = Math.pow(num, 2);
        break;
      case 'x³':
        evaluation = Math.pow(num, 3);
        break;
      case 'xʸ':
        const [base, exponent] = input.split('ʸ');
        evaluation = Math.pow(parseFloat(base), parseFloat(exponent));
        break;
      case '²√x':
        evaluation = Math.sqrt(num);
        break;
      case '³√x':
        evaluation = Math.cbrt(num);
        break;
      case 'ʸ√x':
        const [radicand, index] = input.split('ʸ√x');
        evaluation = Math.pow(parseFloat(radicand), 1 / parseFloat(index));
        break;
      case 'eˣ':
        evaluation = Math.exp(num);
        break;
      case '10ˣ':
        evaluation = Math.pow(10, num);
        break;
      case '1/x':
        evaluation = 1 / num;
        break;
      case 'ln':
        evaluation = Math.log(num);
        break;
      case 'log₁₀':
        evaluation = Math.log10(num);
        break;
      case 'sin':
        evaluation = Math.sin(num);
        break;
      case 'cos':
        evaluation = Math.cos(num);
        break;
      case 'tan':
        evaluation = Math.tan(num);
        break;
      case 'sinh':
        evaluation = Math.sinh(num);
        break;
      case 'cosh':
        evaluation = Math.cosh(num);
        break;
      case 'tanh':
        evaluation = Math.tanh(num);
        break;
      case 'x!':
        evaluation = factorial(num);
        break;
      case 'π':
        evaluation = Math.PI;
        break;
      case 'e':
        evaluation = Math.E;
        break;
      case 'EE':
        setInput((prev) => prev + 'e');
        return;
      case 'Rand':
        evaluation = Math.random();
        break;
      default:
        evaluation = 'Error';
    }
    setResult(evaluation);
    setInput(evaluation.toString());
  };

  const factorial = (n) => {
    if (n < 0) return 'Error';
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`calculator ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-switcher" onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Display value={result || input || '0'} />
      <div className="buttons">
        {['(', ')', 'MC', 'M+', 'M-', 'MR', 'C', '+/-', '%', '÷', '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9'
          , '×', '1/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-', 'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'
          , 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
        ].map((label) => (
          <Button key={label} label={label} onClick={label === '2nd' || label === 'eˣ' ||
            label === '10ˣ' || label === '1/x' || label === 'x!' || label === 'ln' ||
            label === 'log₁₀' || label === 'x²' || label === 'x³' || label === 'xʸ' ||
            label === '²√x' || label === '³√x' || label === 'ʸ√x' || label === 'sin' ||
            label === 'cos' || label === 'tan' || label === 'sinh' || label === 'cosh' ||
            label === 'tanh' || label === 'π' || label === 'e' || label === 'EE' ||
            label === 'Rand' ? () => calculateAdvanced(label) : handleButtonClick} className={['+', '-', '×', '÷', '=', '.'].includes(label) ? 'button operator' : 'button'} />
        ))}
      </div>
      {showConfetti && <ConfettiExplosion />}
    </div>
  );
};

export default Calculator;
