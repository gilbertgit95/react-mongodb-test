import React from 'react';

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let config = this.props.config

    return (
      <div className="col-md-3">
        <div style={ {'border': '3px solid #ebd350'} }
             className="img-thumbnail max-width product-item">
          <img className="max-width"
              src={ config.product_image } alt="product" />
          <a href="/#/product-form/null"
             className="prod-name max-width"
             style={ {'fontWeight': 'bold'} }>
            { config.product_name }
          </a>
        </div>
      </div>
    )
  }
}