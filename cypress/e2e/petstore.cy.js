describe('PetStore API Tests', () => {
  const apiUrl = 'https://petstore.swagger.io/v2';

  it('Crear un usuario', () => {
    cy.request('POST', `${apiUrl}/user`, {
      id: 1,
      username: 'alanvv',
      firstName: 'Alan',
      lastName: 'Valladolid',
      email: 'alanvv@gmail.com',
      password: 'password',
      phone: '987803472',
      userStatus: 1
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Buscar el usuario creado', () => {
    cy.request('GET', `${apiUrl}/user/alanvv`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username', 'alanvv');
    });
  });

  it('Actualizar el nombre y el correo del usuario', () => {
    cy.request('PUT', `${apiUrl}/user/alanvv`, {
      id: 1,
      username: 'alanvv',
      firstName: 'Alexis',
      lastName: 'Vallejos',
      email: 'alexisvv@gmail.com',
      password: 'password',
      phone: '987803472',
      userStatus: 1
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Buscar el usuario actualizado', () => {
    cy.request('GET', `${apiUrl}/user/alanvv`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('firstName', 'Alexis');
      expect(response.body).to.have.property('lastName', 'Vallejos');
      expect(response.body).to.have.property('email', 'alexisvv@gmail.com');
    });
  });

  it('Eliminar el usuario', () => {
    cy.request('DELETE', `${apiUrl}/user/alanvv`).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'GET',
      url: `${apiUrl}/user/alanvv`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
