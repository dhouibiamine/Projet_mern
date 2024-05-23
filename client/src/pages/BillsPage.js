import React ,{useEffect , useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import {EyeOutlined} from '@ant-design/icons';
import axios from 'axios';
import { Modal,Table ,Button , message} from 'antd';

const BillsPage = () => {
    const dispatch = useDispatch()
    const [billsData,setBillsData] = useState([]);
    const [popupModal, setPopupModel] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null)
    const getAllBills = async() =>{
      try {
        dispatch({
          type:'SHOW_LOADING',
        });
        const {data} = await axios.get('/api/bills/get-bills');
        setBillsData(data);
        dispatch({type:'HIDE_LOADING'})
        console.log(data);
      } catch (error) {
        dispatch({type:'HIDE_LOADING'})
        console.log(error)
      }
    }
    
      useEffect(()=> {
        
        getAllBills();
      },[])
  
      
  
  
      //able data 
      const columns = [
        {title:'ID',dataIndex:'_id'},
        {title:'Customer Name',dataIndex:'customerName',},
        {title:'Contact No',dataIndex:'customerNumber'},
        {title:'Subtotal',dataIndex:'subTotal'},
        {title:'Tax',dataIndex:'tax'},
        {title:'Total Amount',dataIndex:'totalAmount'},
       

        
        {title:"Actions", dataIndex:"_id",render:(id,record )=>(
        <div>
         
         <EyeOutlined style={{cursor:'pointer'}} 
         onClick={()=>{
            setSelectedBill(record);
            setPopupModel(true)
         }}
         
         />
         
          
        </div> 
        ),
      },
    ];
    
     
    
  return (
    <DefaultLayout>
        <div className='d-flex justify-content-between'>
          <h1>Invoice List</h1>
      
       </div>
        
        <Table columns={columns} dataSource={billsData} bordered/>
        {
          popupModal && (
            <Modal 
            title="Invoice Details"
            visible={popupModal}  
             onCancel={()=>{
              
              setPopupModel(false);
             }}
              footer={false}>
       
      </Modal>
          )
           }
    </DefaultLayout>
  )
}

export default BillsPage