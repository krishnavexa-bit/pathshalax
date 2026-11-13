// @ts-nocheck -- ported as-is from the original PathshalaX JavaScript source.
export const lessons = [
  {
    id: 'foundations',
    number: '01',
    title: 'Understanding Quadratic Equations',
    shortTitle: 'The foundations',
    duration: '12 min',
    level: 'Foundation',
    objective: 'Recognise a quadratic equation, identify its coefficients and write it in standard form.',
    intro: 'A quadratic equation is a polynomial equation in one variable whose highest power is 2. The word “quadratic” comes from the square term, x².',
    points: [
      'The standard form is ax² + bx + c = 0.',
      'a, b and c are real numbers, and a must not be zero.',
      'a is the coefficient of x², b is the coefficient of x, and c is the constant term.',
      'A missing term has coefficient 0. For example, in 4x² − 9 = 0, b = 0.'
    ],
    examples: [
      {
        prompt: 'Identify a, b and c in 3x² − 5x + 7 = 0.',
        steps: ['Compare the equation with ax² + bx + c = 0.', 'The coefficient of x² is 3, so a = 3.', 'The coefficient of x is −5, so b = −5.', 'The constant term is 7, so c = 7.'],
        answer: 'a = 3, b = −5, c = 7'
      },
      {
        prompt: 'Write x² + 5x = 6 in standard form.',
        steps: ['Bring every term to the left-hand side.', 'Subtract 6 from both sides.', 'Arrange in descending powers of x.'],
        answer: 'x² + 5x − 6 = 0'
      }
    ],
    checkpoint: 'Before moving on, make sure you can identify the three coefficients and rearrange an equation so that one side is zero.'
  },
  {
    id: 'factorisation',
    number: '02',
    title: 'Solving by Factorisation',
    shortTitle: 'Factorisation',
    duration: '15 min',
    level: 'Core method',
    objective: 'Factorise suitable quadratic expressions and use the zero-product property to find roots.',
    intro: 'Factorisation rewrites a quadratic expression as a product of simpler factors. Once the product is zero, at least one factor must be zero.',
    points: [
      'First write the equation in standard form.',
      'For x² + (p + q)x + pq, look for two numbers whose sum is the coefficient of x and whose product is the constant term.',
      'Use the identity (x + p)(x + q) = 0, then set each factor equal to zero.',
      'Always substitute the roots back into the original equation to check them.'
    ],
    examples: [
      {
        prompt: 'Solve x² + 5x + 6 = 0 by factorisation.',
        steps: ['Find two numbers with sum 5 and product 6: 2 and 3.', 'Write x² + 5x + 6 as (x + 2)(x + 3).', 'Set each factor to zero: x + 2 = 0 or x + 3 = 0.', 'Solve both simple equations.'],
        answer: 'x = −2 or x = −3'
      },
      {
        prompt: 'Solve x² − 5x + 6 = 0.',
        steps: ['The required numbers have sum −5 and product 6: −2 and −3.', 'Factorise: (x − 2)(x − 3) = 0.', 'Set each factor equal to zero.'],
        answer: 'x = 2 or x = 3'
      }
    ],
    checkpoint: 'The pair of numbers must satisfy both conditions: their sum matches the middle coefficient and their product matches the constant term.'
  },
  {
    id: 'formula',
    number: '03',
    title: 'The Quadratic Formula',
    shortTitle: 'Quadratic formula',
    duration: '14 min',
    level: 'Core method',
    objective: 'Apply the quadratic formula carefully, including correct substitution of negative coefficients.',
    intro: 'When factorisation is difficult, the quadratic formula gives the roots of any quadratic equation in standard form.',
    points: [
      'For ax² + bx + c = 0, the roots are x = [−b ± √(b² − 4ac)] / 2a.',
      'Identify a, b and c from the standard form before substituting.',
      'Use brackets around negative values. For example, (−3)² = 9.',
      'The ± sign gives two possible values: one using plus and one using minus.'
    ],
    examples: [
      {
        prompt: 'Solve 2x² + 3x − 2 = 0 using the quadratic formula.',
        steps: ['Here a = 2, b = 3 and c = −2.', 'Discriminant D = b² − 4ac = 9 − 4(2)(−2) = 25.', 'Substitute: x = [−3 ± √25] / 4.', 'So x = (−3 + 5)/4 or x = (−3 − 5)/4.'],
        answer: 'x = 1/2 or x = −2'
      }
    ],
    checkpoint: 'Keep the denominator as 2a, not 2, and use brackets carefully when b or c is negative.'
  },
  {
    id: 'discriminant',
    number: '04',
    title: 'Discriminant & Nature of Roots',
    shortTitle: 'Discriminant',
    duration: '12 min',
    level: 'Concept builder',
    objective: 'Calculate the discriminant and predict whether roots are distinct, equal or non-real.',
    intro: 'The expression under the square root in the quadratic formula is called the discriminant. It tells us the nature of the roots without solving the full equation.',
    points: [
      'Discriminant: D = b² − 4ac.',
      'If D is positive, the equation has two distinct real roots.',
      'If D is zero, the equation has two equal real roots.',
      'If D is negative, the equation has no real roots.'
    ],
    examples: [
      {
        prompt: 'Find the nature of roots of x² − 4x + 4 = 0.',
        steps: ['Identify a = 1, b = −4 and c = 4.', 'D = (−4)² − 4(1)(4).', 'D = 16 − 16 = 0.', 'A zero discriminant means the roots are real and equal.'],
        answer: 'Two equal real roots (both are 2)'
      },
      {
        prompt: 'Find the nature of roots of 2x² + 2x + 5 = 0.',
        steps: ['Here a = 2, b = 2 and c = 5.', 'D = 2² − 4(2)(5) = 4 − 40 = −36.', 'The discriminant is negative.'],
        answer: 'No real roots'
      }
    ],
    checkpoint: 'Remember the sign test: positive → distinct real, zero → equal real, negative → no real roots.'
  },
  {
    id: 'applications',
    number: '05',
    title: 'Applications & Word Problems',
    shortTitle: 'Word problems',
    duration: '16 min',
    level: 'Application',
    objective: 'Convert a simple real-life situation into a quadratic equation and interpret the valid root.',
    intro: 'Word problems become manageable when you define the unknown clearly, form an equation and check what the answer means in the original situation.',
    points: [
      'Choose a variable and state what it represents.',
      'Translate the given relationship into an equation.',
      'Bring the equation to standard form and solve it.',
      'Reject a root only when the context makes it invalid, such as a negative length.'
    ],
    examples: [
      {
        prompt: 'The product of two consecutive positive integers is 56. Find them.',
        steps: ['Let the smaller integer be x. The next integer is x + 1.', 'Their product is x(x + 1) = 56.', 'Rearrange: x² + x − 56 = 0.', 'Factorise: (x + 8)(x − 7) = 0, so x = −8 or x = 7.', 'The integers are positive, so x = −8 is not valid here.'],
        answer: 'The integers are 7 and 8.'
      }
    ],
    checkpoint: 'A mathematical root is not automatically a valid real-world answer. Check the conditions in the question.'
  }
];

export const questions = [
  {
    id: 'q1', topic: 'Identifying quadratics', lessonId: 'foundations',
    prompt: 'Which of the following is a quadratic equation in one variable?',
    options: ['x² + 3x + 2 = 0', 'x + 2 = 0', 'x³ − 2x + 1 = 0', '1/x + 2 = 0'], answer: 0,
    explanation: 'A quadratic equation is a polynomial equation whose highest power of the variable is 2. Only the first option has degree 2.',
    feedback: ['Correct. The highest power is 2.', 'This is linear because the highest power is 1.', 'This is cubic because the highest power is 3.', 'This is not a quadratic polynomial equation because the variable appears in the denominator.']
  },
  {
    id: 'q2', topic: 'Standard form', lessonId: 'foundations',
    prompt: 'What is the value of b in 3x² − 5x + 2 = 0?',
    options: ['3', '5', '−5', '2'], answer: 2,
    explanation: 'Compare with ax² + bx + c = 0. The coefficient of x is −5, so b = −5.',
    feedback: ['3 is the coefficient a of x².', 'The sign is important: the coefficient is negative.', 'Correct. b is the signed coefficient of x.', '2 is the constant term c.']
  },
  {
    id: 'q3', topic: 'Standard form', lessonId: 'foundations',
    prompt: 'Which is the standard form of x² + 3x = 10?',
    options: ['x² + 3x + 10 = 0', 'x² + 3x − 10 = 0', 'x² − 3x − 10 = 0', 'x² − 3x + 10 = 0'], answer: 1,
    explanation: 'Subtract 10 from both sides to make the right-hand side zero: x² + 3x − 10 = 0.',
    feedback: ['Moving +10 from the right side makes it −10 on the left.', 'Correct. Every term is on the left and the right side is zero.', 'The sign of 3x should not change.', 'Both signs have been changed incorrectly.']
  },
  {
    id: 'q4', topic: 'Factorisation', lessonId: 'factorisation',
    prompt: 'Which is the correct factorisation of x² + 7x + 12?',
    options: ['(x + 2)(x + 6)', '(x − 3)(x − 4)', '(x + 3)(x + 4)', '(x + 1)(x + 12)'], answer: 2,
    explanation: '3 + 4 = 7 and 3 × 4 = 12, so x² + 7x + 12 = (x + 3)(x + 4).',
    feedback: ['2 + 6 is 8, not 7.', 'The product is positive, but the middle coefficient would be negative.', 'Correct. The numbers add to 7 and multiply to 12.', '1 + 12 is 13, not 7.']
  },
  {
    id: 'q5', topic: 'Factorisation', lessonId: 'factorisation',
    prompt: 'The roots of x² − 5x + 6 = 0 are:',
    options: ['−2 and −3', '2 and 3', '1 and 6', '−1 and −6'], answer: 1,
    explanation: 'Factorise as (x − 2)(x − 3) = 0. Hence x = 2 or x = 3.',
    feedback: ['These values are roots of x² + 5x + 6, not this equation.', 'Correct. Both values make the product zero.', 'Their sum and product do not match the equation.', 'These values do not satisfy the equation.']
  },
  {
    id: 'q6', topic: 'Factorisation', lessonId: 'factorisation',
    prompt: 'Solve 2x² + x − 3 = 0.',
    options: ['x = 1 or x = −3/2', 'x = −1 or x = 3/2', 'x = 3 or x = −1/2', 'x = 1 or x = 3/2'], answer: 0,
    explanation: '2x² + x − 3 = (2x + 3)(x − 1) = 0, giving x = −3/2 or x = 1.',
    feedback: ['Correct. Both roots satisfy the factorised equation.', 'Check the signs when setting each factor to zero.', 'The factors are not solved correctly.', 'The root from 2x + 3 = 0 should be negative.']
  },
  {
    id: 'q7', topic: 'Discriminant', lessonId: 'discriminant',
    prompt: 'What is the discriminant of x² − 4x + 4 = 0?',
    options: ['−4', '4', '0', '16'], answer: 2,
    explanation: 'a = 1, b = −4 and c = 4. D = b² − 4ac = 16 − 16 = 0.',
    feedback: ['The square of −4 is positive 16.', 'This misses the subtraction of 4ac.', 'Correct. The discriminant is zero.', '16 is b² before subtracting 4ac.']
  },
  {
    id: 'q8', topic: 'Nature of roots', lessonId: 'discriminant',
    prompt: 'The equation 2x² + 2x + 5 = 0 has:',
    options: ['Two distinct real roots', 'Two equal real roots', 'No real roots', 'One root equal to zero'], answer: 2,
    explanation: 'D = 2² − 4(2)(5) = 4 − 40 = −36. A negative discriminant means there are no real roots.',
    feedback: ['Distinct real roots require a positive discriminant.', 'Equal real roots require a zero discriminant.', 'Correct. The discriminant is negative.', 'A negative discriminant does not give a real zero root.']
  },
  {
    id: 'q9', topic: 'Quadratic formula', lessonId: 'formula',
    prompt: 'Which is the correct quadratic formula for ax² + bx + c = 0?',
    options: ['x = [b ± √(b² − 4ac)] / 2a', 'x = [−b ± √(b² − 4ac)] / 2a', 'x = [−b ± √(b² + 4ac)] / a', 'x = [−b ± √(b² − 4ac)] / a'], answer: 1,
    explanation: 'The correct formula is x = [−b ± √(b² − 4ac)] / 2a.',
    feedback: ['The numerator must begin with −b.', 'Correct. Notice both the negative b and denominator 2a.', 'The sign inside the discriminant and denominator are incorrect.', 'The denominator should be 2a, not a.']
  },
  {
    id: 'q10', topic: 'Discriminant', lessonId: 'discriminant',
    prompt: 'If the discriminant of a quadratic equation is positive, its roots are:',
    options: ['Real and equal', 'Not real', 'Real and distinct', 'Both zero'], answer: 2,
    explanation: 'A positive discriminant gives two distinct real roots.',
    feedback: ['Equal real roots occur when D = 0.', 'No real roots occur when D is negative.', 'Correct. Positive D means two distinct real roots.', 'A positive discriminant does not imply both roots are zero.']
  },
  {
    id: 'q11', topic: 'Discriminant', lessonId: 'discriminant',
    prompt: 'Find the discriminant of 3x² − 12x + 12 = 0.',
    options: ['144', '0', '−36', '12'], answer: 1,
    explanation: 'a = 3, b = −12, c = 12. D = (−12)² − 4(3)(12) = 144 − 144 = 0.',
    feedback: ['144 is only b²; subtract 4ac as well.', 'Correct. The two terms cancel.', 'The calculation has the wrong sign and value.', '12 is the constant term, not the discriminant.']
  },
  {
    id: 'q12', topic: 'Word problems', lessonId: 'applications',
    prompt: 'A rectangle has width x metres and length (x + 3) metres. Its area is 40 m². What is its positive width?',
    options: ['5 m', '8 m', '−8 m', '4 m'], answer: 0,
    explanation: 'x(x + 3) = 40 gives x² + 3x − 40 = 0 = (x + 8)(x − 5). The roots are −8 and 5; width must be positive, so x = 5 m.',
    feedback: ['Correct. The positive solution is 5 m.', '8 m is the corresponding length, not the width.', 'A width cannot be negative in this context.', '4 does not satisfy x(x + 3) = 40.']
  }
];

export const assessmentQuestionIds = ['q1', 'q3', 'q4', 'q6', 'q7', 'q8', 'q9', 'q12'];
