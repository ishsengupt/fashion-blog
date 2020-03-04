import React, { Component } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux'
import MediumEditor from 'medium-editor'
import EditorHeader from './EditorHeader'
import '../../../../node_modules/medium-editor/dist/css/medium-editor.min.css'
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]

export class UploadMagazinePage extends Component {
    constructor () {
        super()
        this.state = {
            title: '',
            description: '',
            continents: 1,
            images: [],
            price: 0
        }
        this.handleClick = this.handleClick.bind(this)
        
      }

      handleClick () {
        console.log('clicked')
        this.refs.fileUploader.click()
      }

    handleChangeTitle = (event) => {
        this.setState({ title: event.currentTarget.value })
    }

    handleChangePrice = (event) => {
        
        this.setState({ price: parseInt(event.currentTarget.value, 10) })
        console.log(this.state)
    }

    handleChangeDecsription = (event) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: event.currentTarget.value })
    }

    handleChangeContinents = (event) => {
        this.setState({ continents: event.currentTarget.value })
        console.log(this.state)
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (!this.state.title || !this.state.description ||
            !this.state.continents || !this.state.images
            || !this.state.price) {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: this.props.user.userData._id,
            title: this.state.title,
            description: this.state.description,
            images: this.state.images,
            continents: this.state.continents,
            price: this.state.price
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    setTimeout(() => {
                        this.props.history.push('/')
                    }, 1000);
                } else {
                    alert('Failed to upload video')
                }
            })
    }

    updateFiles = (newImages) => {
        this.setState({ images: newImages })
        console.log(this.state)
    }

    componentDidMount () {
        const editor = new MediumEditor(/*dom, */".medium-editable",{ 
            autoLink: true,
            delay: 1000,
            targetBlank: true,
            toolbar: {
                buttons: [
                  'bold', 
                  'italic', 
                  'quote', 
                  'underline', 
                  'anchor', 
                  'h1',
                  'h2', 
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'strikethrough',
                  'subscript',
                  'superscript',
                  'pre',
                  'html',
                  'justifyCenter'
                ],
                diffLeft: 25,
                diffTop: 10,
            },
            anchor: {
                placeholderText: 'Type a link',
                customClassOption: 'btn',
                customClassOptionText: 'Create Button'
            },
            paste: {
                cleanPastedHTML: true,
                cleanAttrs: ['style', 'dir'],
                cleanTags: ['label', 'meta'],
                unwrapTags: ['sub', 'sup']
            },
            anchorPreview: {
                hideDelay: 300
            },
            placeholder: {
                text: 'Tell your story...'
            }
        })    
        editor.subscribe('editableInput', (ev, editable) => {
          if(typeof document !== 'undefined')
            this.setState({
              title: document.getElementById('editor-title').value,
              description: `${editor.getContent(0).toString()}`
            })
            console.log(this.state)
        })
      }


    render() {
        return (
            

<div className="container-fluid main-container">
      <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
          <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
              <div className="post-metadata">
              </div>

              <form className="editor-form main-editor" autoComplete="off" >

                <div className="form-group">
                <FileUpload refreshFunction={this.updateFiles} />
                    
                 
                </div>

                <div className="form-group">
                  <textarea col="1" className="editor-title" id="editor-title" placeholder="Title"></textarea>
                </div>

                <div className="form-group">
                  <textarea id="medium-editable" className="medium-editable" data-placeholder="Story"></textarea>
                </div>
                <br /><br />
                <label>Price($)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <select onChange={this.handleChangeContinents}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Submit
                </Button>
           

              </form>

          </div>
      </div> 

</div>
        )



          /*   <Form onSubmit={this.onSubmit}>
               
               <FileUpload refreshFunction={this.updateFiles} />

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={this.handleChangeDecsription}
                    value={this.state.description}
                />
                <br /><br />
                <label>Price($)</label>
                <Input
                    type="number"
                    onChange={this.handleChangePrice}
                    value={this.state.price}
                />
                <br /><br />
                <select onChange={this.handleChangeContinents}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        </div> */
        
    }
}

export default UploadMagazinePage