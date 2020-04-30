const React = require("react");

class Edit_Wishlist extends React.Component {
  render() {

    const allWishlistProductsList = this.props.allWishlistProducts.map(product => {
        return (<div className='product-row row'>
                    <div className='product-col col-4'>
                        <img src={product.img} alt={product.product_name}/>
                    </div>
                    <div className='product-col col-6 product-text'>
                        <div className='product-col-row row'>
                            <p>Product: <strong>{product.product_name}</strong></p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Brand: {product.brand}</p>
                        </div>
                        <div className='product-col-row row'>
                            <p>Category: {product.category_name}</p>
                        </div>
                    </div>
                    <div className='product-col col-2'>
                        <div className='qty-box'>
                            <div className='product-col-row row justify-content-center'>
                                <p>Qty</p>
                            </div>
                            <div className='product-col-row row justify-content-center'>
                                <h1><input type='number' name={product.product_id} value={product.wishlist_qty} className='input-qty text-center'/></h1>
                            </div>
                        </div>
                    </div>
                </div>)
    })

    return (
      <html>
        <head>
            <link rel='stylesheet' href='/edit_wishlist_styles.css'/>
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
                <form method='POST' action='/wishlist?_method=put'>
                    <div className='instructions'>
                        <div className='form-bowl'>
                            <div className='row justify-content-center'>
                                <h4>Edit the quantity below</h4>
                            </div>
                            <br/>
                            <div className='row justify-content-center'>
                                <div className='col-5 d-flex justify-content-end' style={{marginLeft:'20px'}}>
                                    <input type='submit' value='Submit' className='btn btn-primary'/>
                                </div>
                                <div className='col-5'>
                                    <button className='btn back-btn'><a href='/wishlist/' className='text-white text-decoration-none'>Back</a></button>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-2' style={{backgroundColor: 'white', height:'15px'}}></div>
                        </div>
                    </div>
                    <div className='row justify-content-between'>
                        {allWishlistProductsList}
                    </div>
                </form>
            </div>
            <br/>
        </body>
      </html>
    );
  }
}

module.exports = Edit_Wishlist;