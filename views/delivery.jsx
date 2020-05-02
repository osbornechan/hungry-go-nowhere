const React = require("react");

class Delivery extends React.Component {
  render() {

    const supermarketsList = this.props.deliveryData.supermarkets.map(supermarket => {
        return (<div>
                    <div className='supermarket-banner row justify-content-center'>
                        <img src={supermarket.logo} style={{width:'30%', height:'30%', padding:'5px'}}/>
                    </div>
                    <div className='row justify-content-between' id={supermarket.supermarket_name}>
                    </div>
                </div>)
    })

    const allSupermarketProductsList = this.props.deliveryData.allSupermarketProducts.map(product => {
        let productClass = 'supermarket-product product-row row ' + product.supermarket_name;
        return (<div className={productClass}>
                    <div className='product-col col-4'>
                        <img src={product.img} alt={product.product_name}/>
                    </div>
                    <div className='product-col col-6'>
                        <div className='product-col-row row'>
                            <p>Supermarket: {product.supermarket_name}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Delivery Date: {product.delivery_date}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Product: <strong>{product.product_name}</strong></p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Brand: {product.brand}</p>
                        </div>
                        <div className='product-col-row row'>
                            <div className='btn-col col-3'>
                                <button className='btn btn-danger'><a href='#' className='text-white text-decoration-none'>Delete</a></button>
                            </div>
                        </div>
                    </div>
                    <div className='product-col col-2 d-flex justify-content-center'>
                        <div className='qty-box'>
                            <div className='product-col-row row justify-content-center'>
                                <p>Qty</p>
                            </div>
                            <div className='product-col-row row justify-content-center'>
                                <h1>{product.delivery_qty}</h1>
                            </div>
                        </div>
                    </div>
                </div>)
    })

    return (
      <html>
        <head>
            <link href="https://fonts.googleapis.com/css2?family=B612&family=Source+Sans+Pro&display=swap" rel="stylesheet"/>
            <link rel='stylesheet' href='../delivery_styles.css'/>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossOrigin="anonymous"/>
        </head>
        <body>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-10'>
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
                            <h4><a href='/delivery/new' className='text-white text-decoration-none'>Add New Delivery</a></h4>
                        </div>
                        {supermarketsList}
                        {allSupermarketProductsList}
                    </div>
                </div>
            </div>
            <br/>
            <script src='../script.js'></script>
        </body>
      </html>
    );
  }
}

module.exports = Delivery;