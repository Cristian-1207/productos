import {Products, ProductsManagement} from "./products.js";
class Ui {
    constructor() {
        this.uiName = document.getElementById("name");
        this.uiDescription = document.getElementById("description");
        this.uiQuantity = document.getElementById("quantity");
        this.uiForm = document.getElementById("form-data");
        this.btnEditarProducto = document.getElementById("btnEditarProducto");
        this.container = document.getElementById("container-table");
        this.manager =  new ProductsManagement();
        let p1 = new Products("Pollo", "Pollo Sofia", 20);
        let p2 = new Products("Galletas", "Galleras Mabel", 50);
        let p3 = new Products("Pollo", "Pollo Imba", 50);
        this.manager.addProducts(p1);
        this.manager.addProducts(p2);
        this.manager.addProducts(p3);
        this.loadEvents();
    }
    loadEvents() {
        this.uiForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addProducts(
                this.uiName.value,
                this.uiDescription.value,
                this.uiQuantity.value);
            this.clearForm();
        });
        this.btnEditarProducto.addEventListener('click',(e)=>{
            this.editProductos(
                this.manager.showProducts()[document.getElementById('editProductId').value],
                new Products(
                    document.getElementById('nameEditar').value,
                    document.getElementById('descriptionEditar').value,
                    document.getElementById('quantityEditar').value
                ));
        })
    }
    clearForm() {
                this.uiName.value = "";
                this.uiDescription.value = ""
                this.uiQuantity.value = ""
    }
    loadTable() {
        var html = "";
        for (var i = 0; i < this.manager.showProducts().length; i++) {
            html += `
            <tr>
                <td scope="row">
                ${this.manager.showProducts()[i].name}</td>
                <td>${this.manager.showProducts()[i].description}</td>
                <td>${this.manager.showProducts()[i].quantity}</td>
                <td>
                <button id='edit${i}'type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Editar
                </button>
                <button id='del${i}'>Eliminar</button></td>
            </tr>`;
        }
        this.container.innerHTML = html;
        this.loadEditEvents();
        this.loadDeleteEvents();
    }
    loadEditEvents(){
        for(let i=0;i<this.manager.showProducts().length;i++){
            document.getElementById(`edit${i}`).addEventListener('click',(e)=>{
              document.getElementById("editProductId").value=i
              document.getElementById("nameEditar").value=this.manager.showProducts()[i].name
              document.getElementById("descriptionEditar").value=this.manager.showProducts()[i].description
              document.getElementById("quantityEditar").value=this.manager.showProducts()[i].quantity
            })
        }
    }
    loadDeleteEvents(){
        for(let i=0;i<this.manager.showProducts().length;i++){
            document.getElementById(`del${i}`).addEventListener('click',(e)=>{
                this.manager.removeProducts(this.manager.showProducts()[i]);
                this.loadTable();
            })
        }
    }
    addProducts(name, description, quantity) {
        let p1 = new Products(name, description, quantity);
        this.manager.addProducts(p1);
        this.loadTable();

    }
    editProductos(product,nuevoproducto){
        this.manager.updateProducts(product,nuevoproducto);
        this.loadTable();
    }

}
let ui = new Ui();
ui.loadTable();
