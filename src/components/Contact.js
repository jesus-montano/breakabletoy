import React, { Component } from 'react'

import 'antd/lib/pagination/style/css'
import { Table } from 'antd';
import 'antd/dist/antd.css'
import ContactEdit from './ContactEdit'
import Contactform from './Contactform'
import {
  Form, Input, Select, Button, notification,
} from 'antd';
class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
        show:false,
        selectedContact:{},
        showAdd:false,
      selectedId:'',
      page: 1,
      pages: null,
      contacts: [],
      totalDocs: null,

      columns : [{
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'last name',
        dataIndex: 'lastname',
      },
      {
        title: 'email',
        dataIndex: 'email',
      },
      {
        title: 'phone',
        dataIndex: 'phone',
      },
      {
        title: 'company',
        dataIndex: 'company',
      },
      {
        title: 'Action', key: 'action',
        render: (text, record) => (<a onClick={this.onContactCheck.bind(this, record)}>Edit</a>),
      },
      {
        title: 'Action', key: 'action',
        render: (text, record) => (<a onClick={this.onContactDelete.bind(this, record)}>Delete</a>),
      }
        ]

    }
  }
  onContactDelete(contact){
    fetch(`http://localhost:4000/api/contact/${contact._id}`,{
        method: 'DELETE',
            headers: {
                'content-type': 'application/json'},
                body: JSON.stringify(contact._id)
            }).then(res => {
                        
              if (res.status===400){
                  notification.error(
                      {
                        message: 'error',
                        description:res.statusText   
                      }
                  )}else if (res.status===404){
                      notification.error(
                          {
                            message: 'error',
                            description:res.statusText   
                          }
                      )
              }
              else if(res.status===500){
                  notification.error(
                      {
                        message: 'error',
                        description:res.statusText   
                      }
                  )
  
                }
          })
            .then(data => {
                console.log(data)
                this.fetchContacts(this.page)
            })
            this.setState({show:false})

    }
  
  onContactCheck(contact){
    this.setState({selectedContact: contact, show:true, showAdd: false})
    
    

  }
  componentWillMount(){
    this.fetchContacts(this.state.page)
  }

  fetchContacts(page) {
    return fetch(`http://localhost:4000/api/contact?page=${page}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ pages: data.totalPages, contacts: data.docs, page: data.page, totalDocs: data.totalDocs, show:false, showAdd:false})
      })
  }
  
  onPagerChange(page) {
    this.fetchContacts(page)
  }
  mostar(){
    this.setState({showAdd:!this.state.showAdd, show:false})
    
    
  
  }
  render() {
      
    const columns= this.state.columns
    const contactsItems = this.state.contacts.map((contact,index) => {
        return Object.assign({},contact,{key:index})
    })
    
    return (
      <div>
        
        
        <Table columns={columns} dataSource={contactsItems} size="middle" pagination={{defaultCurrent:1, 
                                                                current:this.state.page, 
                                                                total:this.state.totalDocs, 
                                                                onChange:this.onPagerChange.bind(this)}} />
        <button onClick={this.mostar.bind(this)}>Add new </button>
        {this.state.show&&<ContactEdit contact={this.state.selectedContact} rtabla={this.fetchContacts.bind(this)}/>}
        {this.state.showAdd&&<Contactform rtabla={this.fetchContacts.bind(this)}/>}
      </div>
    )
  }
}


export default Contact
