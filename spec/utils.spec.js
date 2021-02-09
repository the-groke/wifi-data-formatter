const { expect } = require("chai");
const { it } = require('mocha');
const {
    formatPostcode,
    convertUKDateToUS,
    returnExpiryDate,
    getDataByCentre,
    getCentres,
    formatDatum,
    objectKeysToLowerCase
} = require("../utils");
const testData = [
    {
      'Email Address': '588@gmail.com',
      Title: 'Mr',
      Forename: 'Nile',
      Surname: 'Rogers',
      Postcode: 'MI44 1JZ',
      'Mobile Number': '01219877583',
      'Registration Location ID': 'JLLS-LGGRO-01',
      'Registration Location Name': 'JLLS  Grosvenor Centre Shopping',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': '188@hotmail.com',
      Title: 'Ms',
      Forename: 'Alicia',
      Surname: 'Keys',
      Postcode: 'CM6 1XF',
      'Mobile Number': '01219877583',
      'Registration Location ID': 'JLLS-LGJAC-01',
      'Registration Location Name': 'Jackson Square Shopping Centre',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': '133@outlook.com',
      Title: 'Ms',
      Forename: 'Gladys',
      Surname: 'Knight',
      Postcode: 'BN22 9PA',
      'Mobile Number': '01219877583',
      'Registration Location ID': 'JLLS-LGEAS-01',
      'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': 'jhij@gmail.com',
      Title: 'Mr',
      Forename: 'R',
      Surname: 'Kelly',
      Postcode: 'CB23 8TL',
      'Mobile Number': 'NOT CAPTURED',
      'Registration Location ID': 'JLLS-LGGRA-01',
      'Registration Location Name': 'JLL Grafton',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': '8365@gmail.com',
      Title: 'Mr',
      Forename: 'Bootsy',
      Surname: 'Collins',
      Postcode: 'CM23 1FL',
      'Mobile Number': '01219877583',
      'Registration Location ID': 'JLLS-LGJAC-01',
      'Registration Location Name': 'Jackson Square Shopping Centre',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': '856@outlook.com',
      Title: 'Mr',
      Forename: 'Rick',
      Surname: 'James',
      Postcode: 'BN22 8JT',
      'Mobile Number': 'NOT CAPTURED',
      'Registration Location ID': 'JLLS-LGEAS-01',
      'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    },
    {
      'Email Address': 'c846@gmail.com',
      Title: 'Mr',
      Forename: 'James',
      Surname: 'Brown',
      Postcode: 'CM23 3WD',
      'Mobile Number': '01219877583',
      'Registration Location ID': 'JLLS-LGJAC-01',
      'Registration Location Name': 'Jackson Square Shopping Centre',
      'Marketing Opt In': 'Yes',
      'Expiry Date': '8/2/2024'
    }];

const noDupes = [
        {
          'Email Address': '588@gmail.com',
          Title: 'Mr',
          Forename: 'Nile',
          Surname: 'Rogers',
          Postcode: 'MI44 1JZ',
          'Mobile Number': '01219877583',
          'Registration Location ID': 'JLLS-LGGRO-01',
          'Registration Location Name': 'JLLS  Grosvenor Centre Shopping',
          'Marketing Opt In': 'Yes',
          'Expiry Date': '8/2/2024'
        },
        {
          'Email Address': '188@hotmail.com',
          Title: 'Ms',
          Forename: 'Alicia',
          Surname: 'Keys',
          Postcode: 'CM6 1XF',
          'Mobile Number': '01219877583',
          'Registration Location ID': 'JLLS-LGJAC-01',
          'Registration Location Name': 'Jackson Square Shopping Centre',
          'Marketing Opt In': 'Yes',
          'Expiry Date': '8/2/2024'
        },
        {
          'Email Address': '133@outlook.com',
          Title: 'Ms',
          Forename: 'Gladys',
          Surname: 'Knight',
          Postcode: 'BN22 9PA',
          'Mobile Number': '01219877583',
          'Registration Location ID': 'JLLS-LGEAS-01',
          'Registration Location Name': 'Eastbourne Beacon Shopping Centre',
          'Marketing Opt In': 'Yes',
          'Expiry Date': '8/2/2024'
        },
        {
          'Email Address': 'jhij@gmail.com',
          Title: 'Mr',
          Forename: 'R',
          Surname: 'Kelly',
          Postcode: 'CB23 8TL',
          'Mobile Number': 'NOT CAPTURED',
          'Registration Location ID': 'JLLS-LGGRA-01',
          'Registration Location Name': 'JLL Grafton',
          'Marketing Opt In': 'Yes',
          'Expiry Date': '8/2/2024'
        }]

describe('formatPostcode', () => {
    it('returns a string when passed a string', () => {
        const output = formatPostcode('ls6');
        expect(output).to.be.a('string');
    });
    it('returns a postcode with a space when passed postcode with a space', () => {
        const output = formatPostcode('LS6 2EQ');
        expect(output).to.equal('LS6 2EQ');
    });
    it('returns an uppercase postcode when passed lowercase postcode', () => {
        const output = formatPostcode('ls6 2eq');
        expect(output).to.equal('LS6 2EQ');
    });
    it('returns a postcode with a space when passed postcode without a space', () => {
        const output = formatPostcode('ls62eq');
        expect(output).to.equal('LS6 2EQ');
    });
    it('works for different variations of postcodes', () => {
        const output = formatPostcode('l12eq');
        expect(output).to.equal('L1 2EQ');
        const output2 = formatPostcode('LS28 4ep');
        expect(output2).to.equal('LS28 4EP');
    });
});

describe('convertUKDateToUS()', () => {
    it('returns a string', () => {
        const output = convertUKDateToUS();
        expect(output).to.be.a("string")
    });
    it('returns a date which is the same when days and month are the same', () => {
        const output = convertUKDateToUS("01/01/2000");
        expect(output).to.equal("01/01/2000");
    });
    it('returns a date with the days and months switched when passed a date string', () => {
        const output = convertUKDateToUS("02/01/2000");
        expect(output).to.equal("01/02/2000");
    });
});

describe('returnsExpiryDate()', () => {
    it('returns a string when passed a date object', () => {
        const input = new Date();
        const output = returnExpiryDate(input);
        expect(output).to.be.a('string');
    });
    it('returns a string when passed a string', () => {
        const input = "";
        const output = returnExpiryDate(input);
        expect(output).to.be.a('string');
    });
    it('returns a string when passed no date', () => {
        const output = returnExpiryDate();
        expect(output).to.be.a('string');
    });
    it('returns a date with year 3 years from date when passed date object', () => {
        const output = returnExpiryDate(new Date(2000, 0, 1, 0, 0, 0, 0));
        expect(output).to.eql("1/1/2003");
    });
    it('returns a date string 3 years from date when passed a date string', () => {
        const output = returnExpiryDate("01/01/2000");
        expect(output).to.equal("1/1/2003");
    });
    it('returns a date 3 years from today\'s date on the first of last month when not passed a date', () => {
      const today = new Date();
      const lastMonth = today.getMonth();
      const threeYearsFromNow = today.getFullYear() + 3;
      const output = returnExpiryDate();
      expect(output).to.equal(`1/${lastMonth}/${threeYearsFromNow}`);
  });
});

describe("getDataByCentre()", () => {
    it("returns [] when passed []", () => {
      expect(getDataByCentre([])).to.eql([]);
    });
    it("returns array containing objects of only the centre specified in argument", () => {
        expect(getDataByCentre(testData, "Jackson Square Shopping Centre")).to.eql([
            {
                'Email Address': '188@hotmail.com',
                Title: 'Ms',
                Forename: 'Alicia',
                Surname: 'Keys',
                Postcode: 'CM6 1XF',
                'Mobile Number': '01219877583',
                'Registration Location ID': 'JLLS-LGJAC-01',
                'Registration Location Name': 'Jackson Square Shopping Centre',
                'Marketing Opt In': 'Yes',
                'Expiry Date': '8/2/2024'
              }, {
                'Email Address': '8365@gmail.com',
                Title: 'Mr',
                Forename: 'Bootsy',
                Surname: 'Collins',
                Postcode: 'CM23 1FL',
                'Mobile Number': '01219877583',
                'Registration Location ID': 'JLLS-LGJAC-01',
                'Registration Location Name': 'Jackson Square Shopping Centre',
                'Marketing Opt In': 'Yes',
                'Expiry Date': '8/2/2024'
              }, {
                'Email Address': 'c846@gmail.com',
                Title: 'Mr',
                Forename: 'James',
                Surname: 'Brown',
                Postcode: 'CM23 3WD',
                'Mobile Number': '01219877583',
                'Registration Location ID': 'JLLS-LGJAC-01',
                'Registration Location Name': 'Jackson Square Shopping Centre',
                'Marketing Opt In': 'Yes',
                'Expiry Date': '8/2/2024'
              }]);
      });
  });

  describe('getCentres', () => {
      it('returns an array when passed an array', () => {
          expect(getCentres([])).to.be.an("array");
      });
      it('returns an array of centre names for list with no duplicates', () => {
          expect(getCentres(noDupes)).to.eql(["JLLS  Grosvenor Centre Shopping", "Jackson Square Shopping Centre", "Eastbourne Beacon Shopping Centre", "JLL Grafton"]);
      });
      it('returns an array of centre names with no duplicates when passed an array with duplicate centre names', () => {
        expect(getCentres(testData)).to.eql(["JLLS  Grosvenor Centre Shopping", "Jackson Square Shopping Centre", "Eastbourne Beacon Shopping Centre", "JLL Grafton"]);
      });
  });

  describe('objectKeysToLowerCase', () => {
    it('returns an object when passed an object', () => {
      expect(objectKeysToLowerCase({})).to.be.an('object');
    });
    it('returns an object with key in lower case when passed an object with key in upper case', () => {
      expect(objectKeysToLowerCase({A:1})).to.eql({a:1});
    });
  });

  describe('formatDatum', () => {
    it('works for freerunner data', () => {
      const input = {
        username: '83902745032984573209854702394857203987',
        total_downloaded_bytes: '86897021',
        total_uploaded_bytes: '3137211',
        total_sessions: '4',
        online_time_seconds: '2256',
        postcode: 'M67vw',
        gender: '',
        agent_device: 'iPhone',
        email: 'jhlkhlkj@live.co.uk'
      }
      const output = formatDatum(input);
      expect(output).to.eql({
        username: '83902745032984573209854702394857203987',
        total_downloaded_bytes: '86897021',
        total_uploaded_bytes: '3137211',
        total_sessions: '4',
        online_time_seconds: '2256',
        postcode: 'M6 7VW',
        gender: '',
        agent_device: 'iPhone',
        email: 'jhlkhlkj@live.co.uk',
        "sign up source": "wifi",
        "expiry date": "1/1/2024",
      })
    });
  });

