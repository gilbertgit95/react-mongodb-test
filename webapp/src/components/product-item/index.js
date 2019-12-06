import React from 'react';

export default class ProductItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let config = this.props.config

    return (
      <div className="col-md-3">
        <div className="img-thumbnail max-width product-item">
          <img className="max-width"
              src={ config.product_image } alt="product" />
          <a href={ '/#/product/' + config._id } className="prod-name max-width">
            { config.product_name }
          </a>
        </div>
      </div>
    )
  }
}