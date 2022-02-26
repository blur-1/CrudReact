import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';

const listaDatos = [
  {id: 1, nombre: 'Julio', ciudad: 'Lima'},
  {id: 2, nombre: 'Nestor', ciudad: 'Pekin'},
  {id: 3, nombre: 'Esther', ciudad: 'Cali'}
];

class App extends Component {
  state = {
      data: listaDatos,
      form: {
        id: '',
        nombre: '',
        ciudad: ''
      },
      modalAgregar: false,
      modalActualizar: false
  }

  handleChange = e => {
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  mostrarModalAgregar=()=>{
    this.setState({modalAgregar: true});
  }
  ocultarModalAgregar=()=>{
    this.setState({modalAgregar: false});
  }

  agregar = ()=>{
    let form2 = {...this.state.form};
    form2.id = this.state.data.length+1;
    let data2 = this.state.data;
    data2.push(form2);

    this.setState({data: data2, modalAgregar: false});
    //console.log(this.state.data);
  }

  mostrarModalActualizar=(item)=>{
    this.setState({modalActualizar: true, form: item});
  }
  ocultarModalActualizar=()=>{
    this.setState({modalActualizar: false});
  }

  actualizar= (nuevaInfo)=>{
    let contador = 0;
    var listaActual = this.state.data;
    listaActual.map((itemRegistrado)=>{
      if(nuevaInfo.id == itemRegistrado.id){
        listaActual[contador].nombre= nuevaInfo.nombre;
        listaActual[contador].ciudad = nuevaInfo.ciudad;
      }
      contador++;
    });
    this.setState({data: listaActual, modalActualizar: false})
  }

  eliminar=(item)=>{
    let adv = window.confirm("Desea Eliminar a "+item.nombre+ " de la lista?");
      if(adv){
        var conta = 0;
        var lista = this.state.data;
        lista.map((itemRegistrado)=>{
          if(item.id == itemRegistrado.id){
            lista.splice(conta,1);
          }
          conta++
        });
      this.setState({ data: lista, modalActualizar: false });
      }
  }


  render() {
    return (
      <>
        <Container><br/>
          <Button color='primary' onClick={() => this.mostrarModalAgregar()}>Agregar Contacto</Button><br/>
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.ciudad}</td>
                  <td><Button color='primary' onClick={() => this.mostrarModalActualizar(item)}>Editar</Button>{' '}
                    <Button color='danger'onClick={() => this.eliminar(item)}>Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/*  modal Agregar    */}

        <Modal isOpen={this.state.modalAgregar}>
          <ModalHeader>
            <div><h3>Insertar Contacto</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Ciudad: </label>
              <input className="form-control" name="ciudad" type="text" onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.agregar()}>Añadir</Button>
            <Button className="btn btn-danger" onClick={() => this.ocultarModalAgregar()}>Salir</Button>
          </ModalFooter>
        </Modal>
              
        {/*  modal Actualizar   */}

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control"name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup>
            <FormGroup>
              <label> ciudad:</label>
              <input className="form-control" name="ciudad"type="text"onChange={this.handleChange} value={this.state.form.ciudad}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary"onClick={() => this.actualizar(this.state.form)}>Guardar</Button>
            <Button color="danger" onClick={() =>this.ocultarModalActualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;

