import React,{useState,useEffect} from 'react';
import DefaultLayout from './../components/DefaultLayout';
import axios from 'axios';
import { Row, Col } from 'antd';
import {useDispatch} from "react-redux" ;
import ItemList from '../components/ItemList';

const Homepage = () => {
  const [itemsData,setItemsData] = useState([])
  const [selectedCategory,setSelectedCategory] = useState('drinks')
  const categories = [
    {
      name:'drinks',
      imageURL : 'https://cdn-icons-png.flaticon.com/512/430/430561.png'
    },
    {
      name:'rice',
      imageURL : 'https://cdn-icons-png.flaticon.com/512/3174/3174880.png'
    },
    {
      name:'noodles',
      imageURL:'https://cdn-icons-png.flaticon.com/512/1471/1471262.png'
    }
  ]
  const dispatch = useDispatch()
  //useEffect
  useEffect(()=> {
    const getAllItems = async() =>{
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
        const {data} = await axios.get('/api/items/get-item');
        setItemsData(data);
        dispatch({type:'HIDE_LOADING'})
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    getAllItems()
  },[dispatch])
  return (
    <DefaultLayout>
      <div className='d-flex'>
        {categories.map(category => (
          <div key={category.name} className={`d-flex category ${selectedCategory === category.name && "category-active"}`}

          onClick={()=> setSelectedCategory(category.name)}
          >
            <h4>{category.name}</h4>
            <img src={category.imageURL} alt={category.name} 
            height="40"
             width="60" />

          </div>
        ))}
      </div>
      <Row>
        {
          itemsData.filter(i=>i.category === selectedCategory).map((item) =>(
            <Col xs={24} lg={6} md={12} sm={6}>
             <ItemList key={item.id} item ={item}/>
            </Col>
            
          ))
        }
      </Row>
       
    </DefaultLayout>
  );
}

export default Homepage