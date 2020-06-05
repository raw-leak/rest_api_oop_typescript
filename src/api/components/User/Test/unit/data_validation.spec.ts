import { assert } from 'chai';
import 'mocha';
import { beforeEach } from 'mocha';
import faker from 'faker';
import httpMock from 'node-mocks-http';
import { UserDataValidation } from '../../Validator';

describe('User Data Validation -> ', () => {
  describe('check user essential info -> toCheckBodyEssentialInformation()', () => {
    const Validation = new UserDataValidation();
    let userBody;
    let callOption: object;
    let getHttpMock: Function;

    beforeEach(() => {
      let password = faker.internet.password();

      userBody = {
        username: faker.name.firstName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: password,
        repeat_password: password,
      };

      callOption = {
        method: 'POST',
        url: '/user',
        body: userBody,
      };

      getHttpMock = (options: object) => {
        let req = httpMock.createRequest(options);
        let res = httpMock.createResponse();

        return { req, res };
      };
    });
    describe('OK Cases', () => {
      it('When all data is correct A, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckBodyEssentialInformation(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
      it('When all data is correct B, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckBodyEssentialInformation(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
      it('When all data is correct C, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckBodyEssentialInformation(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
    });
    describe('ERROR Cases', () => {
      describe('body.username', () => {
        it('When username has less than 3 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.username = 'no';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_status = 400;
          let expected_response = {
            message: '"username" length must be at least 3 characters long',
          };

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When username has more than 30 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.username = '123456789012345678901234567890123';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"username" length must be less than or equal to 30 characters long',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When username is undefined, expect to fail with status 400', async () => {
          //Arrange
          userBody.username = undefined;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"username" is required',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert

          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When username is null, expect to fail with status 400', async () => {
          //Arrange
          userBody.username = null;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"username" must be a string',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When username not only contains alpha-numeric characters, expect to fail with status 400', async () => {
          //Arrange
          userBody.username = 'user_%$';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"username" must only contain alpha-numeric characters',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
      describe('body.firstName', () => {
        it('When firstName has less than 3 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.firstName = 'no';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_status = 400;
          let expected_response = {
            message: '"firstName" length must be at least 3 characters long',
          };

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When firstName has more than 30 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.firstName = '123456789012345678901234567890123';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"firstName" length must be less than or equal to 30 characters long',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When firstName is undefined, expect to fail with status 400', async () => {
          //Arrange
          userBody.firstName = undefined;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"firstName" is required',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert

          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When firstName is null, expect to fail with status 400', async () => {
          //Arrange
          userBody.firstName = null;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"firstName" must be a string',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When firstName not only contains alpha-numeric characters, expect to fail with status 400', async () => {
          //Arrange
          userBody.firstName = 'user_%$';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"firstName" must only contain alpha-numeric characters',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
      describe('body.lastName', () => {
        it('When lastName has less than 3 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.lastName = 'no';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_status = 400;
          let expected_response = {
            message: '"lastName" length must be at least 3 characters long',
          };

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When lastName has more than 30 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.lastName = '123456789012345678901234567890123';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"lastName" length must be less than or equal to 30 characters long',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When lastName is undefined, expect to fail with status 400', async () => {
          //Arrange
          userBody.lastName = undefined;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"lastName" is required',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert

          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When lastName is null, expect to fail with status 400', async () => {
          //Arrange
          userBody.lastName = null;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"lastName" must be a string',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When lastName not only contains alpha-numeric characters, expect to fail with status 400', async () => {
          //Arrange
          userBody.lastName = 'user_%$';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"lastName" must only contain alpha-numeric characters',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
      describe('body.email', () => {
        it('When email is undefined, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = undefined;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" is required',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert

          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When email is null, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = null;
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" must be a string',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When email has not valid format, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = '@email.com';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" must be a valid email',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When email has not valid format, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = 'aa@email.a';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" must be a valid email',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When email has not valid format, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = 'a@email.a';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" must be a valid email',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When email has not valid format, expect to fail with status 400', async () => {
          //Arrange
          userBody.email = 'email@email.uk';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"email" must be a valid email',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckBodyEssentialInformation(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
    });
  });

  describe('check user passwords -> toCheckUserPasswords()', () => {
    const Validation = new UserDataValidation();
    let userBody;
    let callOption: object;
    let getHttpMock: Function;

    beforeEach(() => {
      let password = faker.internet.password();

      userBody = {
        password: password,
        repeat_password: password,
      };

      callOption = {
        method: 'POST',
        url: '/user',
        body: userBody,
      };

      getHttpMock = (options: object) => {
        let req = httpMock.createRequest(options);
        let res = httpMock.createResponse();

        return { req, res };
      };
    });

    describe('OK Cases', () => {
      it('When the two passwords are the equal and meet the required format A, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckUserPasswords(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
      it('When the two passwords are the equal and meet the required format B, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckUserPasswords(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
      it('When the two passwords are the equal and meet the required format C, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckUserPasswords(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
    });

    describe('ERROR Cases', () => {
      describe('body.password', () => {
        it('When password has only numers, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = '123456';
          userBody.repeat_password = '123456';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_status = 400;
          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When password has only lowercase letters, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'letters';
          userBody.repeat_password = 'letters';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When password has only uppercase letters, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'LETTERS';
          userBody.repeat_password = 'LETTERS';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert

          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When password has only uppercase and lowercase letters, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'Letter';
          userBody.repeat_password = 'Letter';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When password has less than 6 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'Let12';
          userBody.repeat_password = 'Let12';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When password has more than 30 characters long, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'Letters56789012345678901234567890123456';
          userBody.repeat_password = 'Letters56789012345678901234567890123456';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message:
              '"password" must be a minimum of 6 characters and must include at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
      describe('body.repeat_password', () => {
        it('When password and repeat_password are not equal, expect to fail with status 400', async () => {
          //Arrange
          userBody.password = 'Letter123';
          userBody.repeat_password = 'Letter12';
          let options = callOption;
          let { req, res } = getHttpMock(options);

          let expected_status = 400;
          let expected_response = {
            message: '"repeat_password" must be [ref:password]',
          };

          //Act
          await Validation.toCheckUserPasswords(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
    });
  });

  describe('check id format -> toCheckIdFormat()', () => {
    const Validation = new UserDataValidation();
    let idParams;
    let callOption: object;
    let getHttpMock: Function;

    beforeEach(() => {
      idParams = {
        userId: '5eda373a9a2da125f4833817',
      };

      callOption = {
        method: 'GET',
        url: '/user',
        params: idParams,
      };

      getHttpMock = (options: object) => {
        let req = httpMock.createRequest(options);
        let res = httpMock.createResponse();

        return { req, res };
      };
    });

    describe('OK Cases', () => {
      it('When userId meet the required id format A, expect to pass data validation', async () => {
        //Arrange
        let options: object = callOption;
        let { req, res } = getHttpMock(options);
        let expected_status = 200;

        //Act
        await Validation.toCheckIdFormat(req, res, () => {
          res.ok = true;
        });

        //Assert
        const { statusCode, ok } = res;

        assert.isTrue(ok);
        assert.equal(statusCode, expected_status);
      });
    });

    describe('ERROR Cases', () => {
      describe('params.userId', () => {
        it('When userId not meet the required id format A, expect to pass data validation', async () => {
          //Arrange
          idParams.userId = '123';
          let options: object = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"id" fails to match the required format',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckIdFormat(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
        it('When userId not meet the required id format B, expect to pass data validation', async () => {
          //Arrange
          idParams.userId = 'aef3fg3g54y5y';
          let options: object = callOption;
          let { req, res } = getHttpMock(options);

          let expected_response = {
            message: '"id" fails to match the required format',
          };
          let expected_status = 400;

          //Act
          await Validation.toCheckIdFormat(req, res, () => {
            res.ok = true;
          });

          //Assert
          const { statusCode, ok } = res;
          const data = res._getJSONData();

          assert.notExists(ok);
          assert.equal(statusCode, expected_status);
          assert.deepEqual(data, expected_response);
        });
      });
    });
  });
});
