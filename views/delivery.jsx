const React = require("react");

class Delivery extends React.Component {
  render() {

    const supermarketsList = this.props.deliveryData.supermarkets.map(supermarket => {
        let supermarketPage = '/delivery/supermarket/' + supermarket.supermarket_name.replace(/\s+/g, '-');
        return (<div>
                    <div className='supermarket-banner row'>
                        <a href={supermarket.website} target="_blank"><img src={supermarket.logo} className='supermarket-logo'/></a>
                    </div>
                    <div className='supermarket-container row justify-content-between' id={supermarket.supermarket_name}>
                    </div>
                </div>)
    })

    const allSupermarketProductsList = this.props.deliveryData.allSupermarketProducts.map(product => {
        let productClass = 'supermarket-product product-row col-6 ' + product.supermarket_name;
        return (<div className={productClass}>
                    <div className='row justify-content-center'>
                        <div className='product-col col-4'>
                            <img src={product.img} alt={product.product_name}/>
                        </div>
                        <div className='product-col col-6'>
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
                                <form method='POST' action='/delivery/inventory/'>
                                    <div className='btn-col col-3'>
                                        <input type='submit' name={product.delivery_product_id} value='Merge' className='btn btn-info'/>
                                    </div>
                                </form>
                                <form method='POST' action='/delivery?_method=delete'>
                                    <div className='btn-col col-3'>
                                        <input type='submit' name={product.delivery_product_id} value='Delete' className='btn btn-danger'/>
                                    </div>
                                </form>
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
                    <div className='nav-bar col-2'>
                        <div className='nav-bar-row row justify-content-center'>
                            <a href='/inventory/'><img src='../logo-reverse.png' className='logo'/></a>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5>Welcome, {this.props.userName}!</h5>
                            <button className='btn' style={{width:'100%'}}>Log Out</button>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/inventory/' className='text-white text-decoration-none'>Inventory</a></h5>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/delivery/' className='text-white text-decoration-none'>Delivery</a></h5>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/delivery/products' className='text-white text-decoration-none'>+ Add Delivery</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='#' className='text-white text-decoration-none'># Edit Delivery</a></h6>
                        </div>
                        <div className='nav-bar-row nav-sub-text row justify-content-center'>
                            <h6><a href='/delivery/supermarket/new' className='text-white text-decoration-none'>+ Add Supermarket</a></h6>
                        </div>
                        <div className='nav-bar-row nav-text row justify-content-center'>
                            <h5><a href='/wishlist/' className='text-white text-decoration-none'>Wishlist</a></h5>
                        </div>
                    </div>
                    <div className='col-9'>
                        <div className='top-bar-row row justify-content-center'>
                            <h2>Delivery</h2>
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