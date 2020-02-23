const { expect } = require('chai');
const { db, User } = require('../server/db/index');

describe('Sequelize model', () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  it('has fields firstname, lastName, email, username, password, latitude, longitude', () => {
    const userTest = User.build({
      firstName: 'Test',
      lastName: 'Person',
      email: 'TestPerson@gmail.com',
      username: 'TestPerson',
      password: 'bestpassword',
      latitude: 1.1111111,
      longitude: 1.1111111,
    });
    expect(userTest.firstName).to.equal('Test');
    expect(userTest.lastName).to.equal('Person');
    expect(userTest.email).to.equal('TestPerson@gmail.com');
    expect(userTest.username).to.equal('TestPerson');
    expect(userTest.password).to.equal('bestpassword');
    expect(userTest.latitude).to.equal(1.1111111);
    expect(userTest.longitude).to.equal(1.1111111);
  });

  it('user information cannot be empty', async () => {
    const userTest = User.build({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
    });
    try {
      await userTest.validate();
      throw Error('Please fill in all required fields');
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on firstName');
      expect(err.message).to.contain('Validation notEmpty on lastName');
      expect(err.message).to.contain('Validation notEmpty on email');
      expect(err.message).to.contain('Validation notEmpty on username');
    }
  });
});
