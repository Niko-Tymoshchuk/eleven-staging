export class NumberAlgorithm {
  //Format: YYYY-MM-DD
  dateOfBirth: string;

  lifePathNumber: number | null = null;
  expressionNumber: number | null = null;
  soulNumber: number | null = null;
  personalNumber: number | null = null;

  constructor(dateOfBirth: string) {
    this.dateOfBirth = dateOfBirth;
  }

  calculateLifePathNumber(birthDate: string) {
    const dateParts = birthDate.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    const reducedMonth = this.reduceToSingleDigit(parseInt(month));
    const reducedDay = this.reduceToSingleDigit(parseInt(day));
    const reducedYear = this.reduceToSingleDigit(parseInt(year));

    const lifePathNumber = this.reduceToSingleDigit(
      reducedMonth + reducedDay + reducedYear,
    );

    this.lifePathNumber = lifePathNumber;
  }

  calculateExpressionNumber(birthDate: string) {
    const digits = birthDate.replace(/-/g, "").split("").map(Number);

    const total = digits.reduce((sum, digit) => sum + digit, 0);

    this.expressionNumber = this.reduceToSingleDigit(total);
  }

  calculateSoulNumber(fullName: string): number {
    const vowelValues: { [key: string]: number } = {
      A: 1,
      E: 5,
      I: 9,
      O: 6,
      U: 3,
      Y: 7,
    };

    const vowels = fullName
      .toUpperCase()
      .split("")
      .filter((char) => "AEIOUY".includes(char));

    const validVowels = vowels.filter((char, index) => {
      if (char === "Y") {
        const isVowel =
          index > 0 && "AEIOU".includes(fullName.toUpperCase()[index - 1]);
        return isVowel;
      }
      return true;
    });

    const total = validVowels.reduce(
      (sum, vowel) => sum + (vowelValues[vowel] || 0),
      0,
    );

    this.soulNumber = this.reduceToSingleDigit(total);
    return this.reduceToSingleDigit(total);
  }

  calculatePersonalNumber(fullName: string): number {
    const consonantValues: { [key: string]: number } = {
      B: 2,
      C: 3,
      D: 4,
      F: 6,
      G: 7,
      H: 8,
      J: 1,
      K: 2,
      L: 3,
      M: 4,
      N: 5,
      P: 7,
      Q: 8,
      R: 9,
      S: 1,
      T: 2,
      V: 4,
      W: 5,
      X: 6,
      Z: 8,
      Y: 7,
    };

    const consonants = fullName
      .toUpperCase()
      .split("")
      .filter((char) => "BCDFGHJKLMNPQRSTVWXYZ".includes(char));

    const total = consonants.reduce(
      (sum, consonant) => sum + (consonantValues[consonant] || 0),
      0,
    );

    this.personalNumber = this.reduceToSingleDigit(total);

    return this.reduceToSingleDigit(total);
  }

  reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .map(Number)
        .reduce((a, b) => a + b, 0);
    }
    return num;
  };
}
