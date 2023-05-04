//import logo from './logo.svg';
import './App.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { BicicletaService } from './service/BicicletaService';
import { Panel } from 'primereact/panel';
import { PrimeIcons } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';

function App() {

  const [bicicletas, setBicicletas] = useState([]);
  const [selectedBicicleta, setSelectedBicicleta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('');
  const toast = useRef(null);


  const items = [
    {
      label : 'Nuevo',
      icon : PrimeIcons.PLUS,
      // funcion anonima dispara evento cuando se hace click en el boton nuevo
      //command : () => {showSaveModal()}
      //command : () => {setShowModal(true)}
      command : () => {showSaveModal()}
    },
    {
      label : 'Editar',
      icon : PrimeIcons.PENCIL,
      //command : () => {setShowModal(true)}
      command : () => {edit()}
    },
    {
      label : 'Eliminar',
      icon : PrimeIcons.TRASH,
      command : () => {showConfirmDelete()}
    }
  ];


  useEffect(() => {
    let bicicletaService = new BicicletaService();
    // Prueba fetch data
    //bicicletaService.getAll();
    bicicletaService.getAll().then(res => setBicicletas(res));
  });

  const renderFooter = () => {
    return (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowModal(false)} className="p-button-text" />
            <Button label="Guardar" icon="pi pi-check" onClick={() => save()} autoFocus />
        </div>
    );
  } 

  // Limpiar los datos
  const showSaveModal = () => {
    setId('');
    setModelo('');
    setColor('');
    setUbicacion('');
    setEstado('');
    setShowModal(true);
};

  const save = () => {
    let bicicleta = {};
    if (id !== '') {
      bicicleta.id = id;
    }
    bicicleta.modelo = modelo; 
    bicicleta.color = color;
    bicicleta.ubicacion = ubicacion;
    bicicleta.estado = estado;

    let bicicletaService = new BicicletaService();
    bicicletaService.save(bicicleta).then(res => {
        setId('');
        setModelo('');
        setColor('');
        setUbicacion('');
        setEstado('');
        setShowModal(false);
        toast.current.show({severity:'success', summary: 'Atención!', detail:'Se guardó el registro correctamente', life: 3000})
    });
  };

  const edit = () => {
    setId(selectedBicicleta.id);
    setModelo(selectedBicicleta.modelo);
    setColor(selectedBicicleta.color);
    setUbicacion(selectedBicicleta.ubicacion);
    setEstado(selectedBicicleta.estado);
    setShowModal(true);
  }

  const showConfirmDelete = () => {
    confirmDialog({
      message: '¿Está seguro que desea eliminar el registro?',
      header: 'Atención!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deletePersona()
    });
  }

  const deletePersona = () => {
    let bicicletaService = new BicicletaService();
    bicicletaService.delete(selectedBicicleta.id).then(res => {
      toast.current.show({severity:'info', summary: 'Atención!', detail:'Se eliminó el registro correctamente', life: 3000})
    });
  }

  return (

    <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
      <Toast ref={toast} />
        <Panel header="Ciclas App ">
          <Menubar model={items} style={{marginBottom: '20px'}}/>
          <DataTable value={bicicletas} selectionMode="single" 
                     selection={selectedBicicleta} 
                     onSelectionChange={e => setSelectedBicicleta(e.value)} 
                     dataKey="id"
                     className="p-datatable-gridlines">
            <Column field="id" header="ID"></Column>
            <Column field="modelo" header="Modelo"></Column>
            <Column field="color" header="Color"></Column>
            <Column field="ubicacion" header="Ubicacion"></Column>
            <Column field="estado" header="Estado"></Column>
            </DataTable>

        </Panel>
        <Dialog header="Bicicleta" visible={showModal} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setShowModal(false)}>
        <div className="p-fluid">
                <div className="p-field">
                  <label htmlFor="modelo">Modelo</label>
                  <InputText name="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
                </div>
                <div className="p-field">
                  <label htmlFor="color">Color</label>
                  <InputText name="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="p-field">
                <label htmlFor="ubicacion">Ubicacion</label>
                  <InputText name="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
                </div>
                <div className="p-field">
                  <label htmlFor="estado">Estado</label>
                  <InputText name="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </div>
            </div>
        </Dialog>
    </div>
  );
}

export default App;
