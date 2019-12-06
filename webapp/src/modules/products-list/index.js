import React from 'react';
import utils from './../../utils';

import ProductItem from './../../components/product-item'
import AddProduct from './../../components/add-product'

export default class ProductsList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount() {
    let products = await utils.getAllProducts()
    this.setState({
      products: products
    })
  }

  render() {
    let products = this.state.products
    let computedProducts = []
    let lsGroupSize = 4

    // add item for add product
    products.unshift({
      product_image: 'https://cdn2.iconfinder.com/data/icons/ecommerce-solid-version/32/add_product_new_product_item_ecommerceproduct--512.png',
      product_name: 'Add Product',
      highlighted: true
    })

    let lsGroup = Math.ceil(products.length  / lsGroupSize)
    let lsCount = 0

    while (lsCount < lsGroup) {
      let start = lsCount * lsGroupSize
      let end = start + lsGroupSize

      computedProducts.push(products.slice(start, end))
      lsCount = lsCount + 1
    }

    return (
      <div className="container">
        <ul className="breadcrumb">
            <li>Home</li>
        </ul>

        {
          computedProducts.map((rows, rowIndex) => {
            return (
              <div className="row"  key={ rowIndex }>
                {
                  rows.map((item, colIndex) => {
                    if (item.highlighted) {
                      return (
                        <AddProduct config={ item } key={ colIndex }>
                        </AddProduct>
                      )
                    } else {
                      return (
                        <ProductItem config={ item } key={ colIndex }>
                        </ProductItem>
                      )
                    }
                  })
                }
              </div>
            )
          })
        }
    </div>
    )
  }
}