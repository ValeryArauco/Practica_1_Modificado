
describe("Pruebas de visualización y funcionalidad", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Debe mostrar el div 'admin' y ocultar el menú al hacer clic en 'admin'", () => {
    cy.get("#adminButton").click();
    cy.get("#admin").should("be.visible");
    cy.get("#menu-div").should("not.be.visible");
  });

  it("Debe ocultar el div 'admin' y mostrar el menú al hacer clic en 'cliente'", () => {
    cy.get("#clienteButton").click();
    cy.get("#admin").should("not.be.visible");
  });
  
});

  /*describe("Prueba de visualización de productos", () => {
    it("Verifica que los productos se muestren correctamente", () => {
      cy.visit("/");
      const listaProductos = [
        {
          nombre: "cafe",
          descripcion: "expresso",
          precio: 10.99,
          cantidad: 5,
          categoria: "cafes"
        },
        {
          nombre: "mate de manzanilla",
          descripcion: "sin azucar medicinal",
          precio: 19.99,
          cantidad: 10,
          categoria: "mates"
        },
      ];
      let html = "";
      listaProductos.forEach(producto => {
        html += `
          <div>
            <h3>Nombre: ${producto.nombre}</h3>
            <p>Descripción: ${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="btn_reservar" onclick="Reservar('${producto.nombre}')">Reservar</button>
            <button class="btn_editar" onclick="Editar('${producto.nombre}')">Editar</button>
            <button class="btn_eliminar">Eliminar</button>
          </div>
        `;
      });

      cy.get("#menu-div").then(div => {
        div.html(html);
      });
      // Verifica que los productos se muestren correctamente en la página
      listaProductos.forEach(producto => {
        cy.contains("Nombre: " + producto.nombre);
        cy.contains("Descripción: " + producto.descripcion);
        cy.contains("Precio: " + producto.precio);
        cy.contains("Cantidad: " + producto.cantidad);
      });
    });
  });
*/
 
describe("Prueba de vizualizacion de mis productos", () => {

  it("deberia llenar los inputs con mi  pedido realizado", () => {
    cy.visit("/");
    cy.get("#adminButton").click();

    cy.get("#nombre").type("Sopa");
    cy.get("#descripcion").type("Sopa de fideo");
    cy.get("#precio").type(20);
    cy.get("#cantidad").type(2);
    cy.get("#categoria").select('Almuerzos')
   
    cy.get("#agregar-button").click();

    cy.get("#menu-div").should("contain", "Sopa");
    cy.get("#menu-div").should("contain", "Sopa de fideo");
    cy.get("#menu-div").should("contain", 20);
    cy.get("#menu-div").should("contain", 2);
    cy.get('#menu-div').should('contain', 'almuerzos')
  });
  it("al hacer click en editar deberia mostrarnos el form editar", () => {
    cy.visit("/");
    cy.get("#adminButton").click();
    cy.get("#nombre").type("Sopa");
    cy.get("#descripcion").type("Sopa de fideo");
    cy.get("#precio").type(20);
    cy.get("#cantidad").type(2);
    cy.get("#categoria").select('Almuerzos')
    cy.get("#agregar-button").click();
    cy.get("#menu-div").should("contain", "Sopa");
    cy.get("#menu-div").should("contain", "Sopa de fideo");
    cy.get("#menu-div").should("contain", 20);
    cy.get("#menu-div").should("contain", 2);
    cy.get('#menu-div').should('contain', 'almuerzos')
    cy.get(".btn_editar").click();
    cy.get("#editarForm").should("be.visible");
  });
  it("al hacer click en eliminar no deberia mostrar el producto en el menu", () => {
    cy.visit("/");
    cy.get("#adminButton").click();
    cy.get("#nombre").type("Sopa");
    cy.get("#descripcion").type("Sopa de fideo");
    cy.get("#precio").type(20);
    cy.get("#cantidad").type(2);
    cy.get("#categoria").select('Almuerzos')
    cy.get("#agregar-button").click();
    cy.get("#menu-div").should("contain", "Sopa");
    cy.get("#menu-div").should("contain", "Sopa de fideo");
    cy.get("#menu-div").should("contain", 20);
    cy.get("#menu-div").should("contain", 2);
    cy.get('#menu-div').should('contain', 'almuerzos');
    cy.get(".btn_eliminar").click();
    cy.get("#menu-div").should(($menuDiv) => {
      expect("not.be.visible");
    });
  });
});