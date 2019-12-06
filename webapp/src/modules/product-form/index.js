import React from 'react';

import utils from './../../utils';

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product_name: '',
      product_desc: '',
      product_brand: '',
      product_price: '',
      product_image: '',
      product_status: ''
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescChange = this.onDescChange.bind(this)
    this.onBrandChange = this.onBrandChange.bind(this)
    this.onPriceChange = this.onPriceChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)

    this.onSave = this.onSave.bind(this)
  }

  onNameChange(event) {
    this.setState({
      product_name: event.target.value
    })
  }
  onDescChange(event) {
    this.setState({
      product_desc: event.target.value
    })
  }
  onBrandChange(event) {
    this.setState({
      product_brand: event.target.value
    })
  }
  onPriceChange(event) {
    this.setState({
      product_price: event.target.value
    })
  }
  onImageChange(event) {
    this.setState({
      product_image: event.target.value
    })
  }
  onStatusChange(event) {
    this.setState({
      product_status: event.target.value
    })
  }

  async onSave() {
    let id = this.props.match.params.id
    let data = {
      product_name: this.state.product_name,
      product_desc: this.state.product_desc,
      product_brand: this.state.product_brand,
      product_price: this.state.product_price,
      product_image: this.state.product_image,
      product_status: this.state.product_status
    }

    // save new product
    if (id !== 'null') {
      await utils.editProduct(id, data)

    // edit product
    } else {
      await utils.addProduct(data)
    }

    window.location.href = window.origin + '/#/product-list'
  }

  async componentDidMount() {
    let id = this.props.match.params.id
    if (id !== 'null') {
      let product = await utils.getProduct(id)
      this.setState({
        product_name: product.product_name,
        product_desc: product.product_desc,
        product_brand: product.product_brand,
        product_price: product.product_price,
        product_image: product.product_image,
        product_status: product.product_status
      })
    }
  }

  render() {
    let id = this.props.match.params.id

    return (
      <div className="container product-wrapper product-form">
        {
          (() => {
            if (id !== 'null') {
              return (
                <ul className="breadcrumb">
                  <li><a href="/#/product-list">Home</a></li>
                  <li><a href={ '/#/product/' + id }>{ this.state.product_name }</a></li>
                  <li>Edit Product Form</li>
                </ul>
              )
            } else {
              return (
                <ul className="breadcrumb">
                  <li><a href="/#/product-list">Home</a></li>
                  <li>Add Product Form</li>
                </ul>
              )
            }
          })()
        }

        <div className="row">
            {/* <!-- information section --> */}
            <div className="col-xs-12 specs">
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label" >Product Name</div>
                    </div>
                    <div className="col-xs-8">
                        <input className="light-color form-control"
                               name="product_name"
                               onChange={ this.onNameChange }
                               value={ this.state.product_name } />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label" >Product Description</div>
                    </div>
                    <div className="col-xs-8">
                        <textarea className="light-color form-control"
                          name="product_desc" 
                          onChange={ this.onDescChange }
                          value={ this.state.product_desc }></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label">Product Image</div>
                    </div>
                    <div className="col-xs-8">
                        <input className="light-color form-control"
                               onChange={ this.onImageChange }
                               value={ this.state.product_image }
                               name="product_image" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label" >Brand</div>
                    </div>
                    <div className="col-xs-8">
                        <input className="light-color form-control"
                               onChange={ this.onBrandChange }
                               value={ this.state.product_brand }
                               name="product_brand" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label" >Price</div>
                    </div>
                    <div className="col-xs-8">
                        <input className="light-color form-control"
                               onChange={ this.onPriceChange }
                               value={ this.state.product_price }
                               name="product_price" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <div className="light-color specs-label" >Status</div>
                    </div>
                    <div className="col-xs-8">
                        <input className="light-color form-control"
                               onChange={ this.onStatusChange }
                               value={ this.state.product_status }
                               name="product_status" />
                    </div>
                </div>
                {/* <!-- buttons --> */}
                <div className="row">
                    <div className="col-xs-12">
                        <button onClick={ this.onSave } type="submit" className="btn btn-primary max-width" >Save</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}