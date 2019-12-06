import React from 'react';

import utils from './../../utils';

export default class Product extends React.Component {
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
    this.onDelete = this.onDelete.bind(this)
  }

  async onDelete() {
    let id = this.props.match.params.id

    await utils.removeProduct(id)

    window.location.href = window.origin + '/#/product-list'
  }

  async componentDidMount() {
    let id = this.props.match.params.id
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

  render() {
    let id = this.props.match.params.id
 
    return (
      <div className="container product-wrapper">
        <ul className="breadcrumb">
            <li><a href="/#/product-list">Home</a></li>
            <li>{ this.state.product_name }</li>
        </ul>

        <div className="row">
            {/* <!-- product image section --> */}
            <div className="col-md-6">
                <img className="max-width"
                    src={ this.state.product_image } alt="product" />
            </div>

            {/* <!-- information section --> */}
            <div className="col-md-6 specs">
                <div className="row">
                    <div className="col-xs-12">
                        <div>{ this.state.product_desc }</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="light-color" >Product Name</div>
                    </div>
                    <div className="col-xs-6">
                        <div className="light-color" >{ this.state.product_name }</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="light-color" >Brand</div>
                    </div>
                    <div className="col-xs-6">
                        <div className="light-color" >{ this.state.product_brand }</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="light-color" >Price</div>
                    </div>
                    <div className="col-xs-6">
                        <div className="light-color" >{ this.state.product_price }</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="light-color" >Status</div>
                    </div>
                    <div className="col-xs-6">
                        <div className="light-color" >{ this.state.product_status }</div>
                    </div>
                </div>
                {/* <!-- buutons --> */}
                <div className="row">
                    <div className="col-xs-6">
                        <button className="btn btn-default max-width"
                                data-toggle="modal"
                                data-target="#remove_product_confirmation">Delete</button>
                    </div>
                    <div className="col-xs-6">
                        <a href={'/#/product-form/' + id } className="btn btn-default max-width" >Edit</a>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- modal box --> */}
        <div id="remove_product_confirmation" className="modal fade" role="dialog">
            <div className="modal-dialog">
                {/* <!-- Modal content--> */}
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Confirmation dialog</h4>
                    </div>
                    <div className="modal-body">
                        <p>Do you really want to remove the product?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.onDelete} data-dismiss="modal" type="button" className="btn btn-default">Confirm</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}