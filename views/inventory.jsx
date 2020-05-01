const React = require("react");

class Inventory extends React.Component {
  render() {

    const allInventoryProductsList = this.props.allInventoryProducts.map(product => {
        return (<div className='product-row row'>
                    <div className='product-col col-4'>
                        <img src={product.img} alt={product.product_name}/>
                    </div>
                    <div className='product-col col-6'>
                        <div className='product-col-row row'>
                            <p>Product: <strong>{product.product_name}</strong></p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Brand: {product.brand}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Category: {product.category_name}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Expiry Date: {product.expiry_date}</p>
                        </div>
                        <div className='product-col-row row'>
                            <div className='btn-col col-4'>
                                <button className='btn btn-info'><a href='/inventory/edit/' className='text-white text-decoration-none'>Edit</a></button>
                            </div>
                            <form method='POST' action='/inventory?_method=delete'>
                                <div className='btn-col col-3'>
                                    <input type='submit' name={product.product_id} value='Delete' className='btn btn-danger'/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='product-col col-2'>
                        <div className='qty-box'>
                            <div className='product-col-row row justify-content-center'>
                                <p>Qty</p>
                            </div>
                            <div className='product-col-row row justify-content-center'>
                                <h1>{product.inventory_qty}</h1>
                            </div>
                        </div>
                    </div>
                </div>)
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='../inventory_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='nav-bar-row row justify-content-center'>
                    <div className='nav-bar-col inventory-tab col-4 nav-bar d-flex justify-content-center'>
                        <h3><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h3>
                    </div>
                    <div className='nav-bar-col delivery-tab col-4 d-flex justify-content-center'>
                        <h3><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h3>
                    </div>
                    <div className='nav-bar-col wishlist-tab col-4 d-flex justify-content-center'>
                        <h3><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h3>
                    </div>
                </div>
                <div className='add-button row justify-content-center'>
                    <h4><a href='/inventory/products' className='text-white text-decoration-none'>Add Product to Inventory</a></h4>
                </div>
                <div className='row justify-content-between'>
                    {allInventoryProductsList}
                </div>
            </div>
            <br/>
        </body>
      </html>
    );
  }
}

module.exports = Inventory;