import { assert } from 'chai';
import 'mocha';
import { agent as request } from 'supertest';
import app from '../../../../../api/server';

describe('User -> Creating new user', () => {
  let a;

  beforeEach(async () => {});

  it('When all data is correct, expect to user to be created', async () => {
    //Arrange

    //Act

    //Assert
    const res = await request(app);
  });
});
